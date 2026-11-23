using Domain.Constants;
using Microsoft.OpenApi.Models;
using Users.Domain.Constants;
using Users.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

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
}
