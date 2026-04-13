using AskDate.Domain.Entities;
using Infrastructure.Data;


namespace Users.Infrastructure.Data
{
    public class ApplicationDbContext : AuditableDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Group> Groups { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public DbSet<Participant> Participants { get; set; }

        public DbSet<Note> Notes { get; set; }

    }
}
