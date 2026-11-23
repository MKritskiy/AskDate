using AskDate.Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace AskDate.Infra.Data;

public class ApplicationDbContext : AuditableDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Group> Groups { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Participant> Participants { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<NoteConfirmation> NoteConfirmations { get; set; }
    public DbSet<AvailabilityMark> AvailabilityMarks { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // A day can carry several marks (intervals); lookups always go by group + member + day.
        // Overlaps are prevented by the repository, which rewrites a member's day as a whole.
        builder.Entity<AvailabilityMark>()
            .HasIndex(m => new { m.GroupId, m.ProfileId, m.Date });

        // Either both bounds (an interval, end after start) or none of them (the whole day)
        builder.Entity<AvailabilityMark>()
            .HasCheckConstraint("CK_AvailabilityMarks_Interval",
                "(\"StartTime\" IS NULL AND \"EndTime\" IS NULL) OR (\"StartTime\" IS NOT NULL AND \"EndTime\" > \"StartTime\")");
    }
}
