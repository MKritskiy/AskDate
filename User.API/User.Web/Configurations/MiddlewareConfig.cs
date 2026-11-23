using Domain.Constants;
using Microsoft.OpenApi.Models;
using Users.Domain.Constants;
using Users.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Users.Web.Configurations;

public static class MiddlewareConfig
{
    public static async Task<IApplicationBuilder> UseAppMiddlewareAndSeedDatabase(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseHsts();
        }

        //app.UseHttpsRedirection(); // Note this will drop Authorization headers

        await SeedDatabase(app);
        app.MapControllers();
        return app;
    }

    static async Task SeedDatabase(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var logger = services.GetRequiredService<ILogger<Program>>();
        var context = services.GetRequiredService<ApplicationDbContext>();

        // Retry while the database container is starting (docker compose race)
        const int maxAttempts = 12;
        for (int attempt = 1; attempt <= maxAttempts; attempt++)
        {
            try
            {
                await context.Database.MigrateAsync();
                await PromoteConfiguredAdmins(context, app.Configuration, logger);
                return;
            }
            catch (Exception ex)
            {
                logger.LogWarning(ex, "Migration attempt {Attempt}/{Max} failed: {Message}", attempt, maxAttempts, ex.Message);
                if (attempt == maxAttempts)
                {
                    logger.LogError(ex, "An error occurred seeding the DB after {Max} attempts.", maxAttempts);
                    return;
                }
                await Task.Delay(TimeSpan.FromSeconds(5));
            }
        }
    }

    /// <summary>
    /// Promotes the accounts listed in ADMIN_EMAIL (comma-separated) to Administrator.
    /// Idempotent and safe for existing databases — the default first-user rule only
    /// applies to fresh installs, so this is the way to grant admin on a live server.
    /// </summary>
    static async Task PromoteConfiguredAdmins(ApplicationDbContext context, IConfiguration configuration, ILogger<Program> logger)
    {
        var adminEmails = (configuration["Admin:Email"] ?? string.Empty)
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .Select(e => e.ToLower())
            .Where(e => e.Length > 0)
            .ToList();

        if (adminEmails.Count == 0) return;

        var users = context.Users.Where(u => adminEmails.Contains(u.Email.ToLower())).ToList();
        var changed = false;
        foreach (var user in users.Where(u => u.Role != Users.Domain.Constants.Roles.Administrator))
        {
            user.Role = Users.Domain.Constants.Roles.Administrator;
            changed = true;
            logger.LogInformation("Promoted {Email} to Administrator (Admin:Email configuration)", user.Email);
        }

        if (changed)
        {
            await context.SaveChangesAsync();
        }

        foreach (var email in adminEmails.Where(e => users.All(u => u.Email.ToLower() != e)))
        {
            logger.LogWarning("Admin:Email contains {Email}, but no such user exists yet. They will be promoted on the next startup after registration.", email);
        }
    }
}
