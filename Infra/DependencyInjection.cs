using AskDate.Application.Interfaces;
using AskDate.Infra.Repositories;
using AskDate.Application.Services;
using AskDate.Infra.Data;
namespace AskDate.Infra;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration config, ILogger logger)
    {
        string? connectionString = config.GetConnectionString("ConnectionString");
        services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));

        services.AddScoped<ICommentRepository, CommentRepo>();
        services.AddScoped<INoteRepository, NoteRepo>();
        services.AddScoped<IGroupRepository, GroupRepo>();
        services.AddScoped<IParticipantRepository, ParticipantRepo>();
        services.AddScoped<INoteConfirmationRepository, NoteConfirmationRepo>();
        services.AddHttpClient<IProfileApiClient, AskDate.Infra.Services.ProfileApiClient>();

        services.AddScoped<IGroupService, GroupService>();
        services.AddScoped<INoteService, NoteService>();
        services.AddScoped<ICommentService, CommentService>();


        logger.LogInformation("{Project} services registered", "Infrastructure");
        return services;
    }
}
