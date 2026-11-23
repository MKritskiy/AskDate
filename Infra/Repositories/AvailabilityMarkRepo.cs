using AskDate.Application.Interfaces;
using AskDate.Domain;
using AskDate.Domain.Entities;
using AskDate.Infra.Data;
using Microsoft.EntityFrameworkCore;

namespace AskDate.Infra.Repositories;

public class AvailabilityMarkRepo(ApplicationDbContext context) : IAvailabilityMarkRepository
{
    public Task<List<AvailabilityMark>> GetByGroupAsync(int groupId) =>
        context.AvailabilityMarks
            .AsNoTracking()
            .Where(m => m.GroupId == groupId)
            .OrderBy(m => m.Date)
            .ThenBy(m => m.StartTime)
            .ToListAsync();

    public async Task<List<AvailabilityMark>> ApplyAsync(
        int groupId,
        int profileId,
        IReadOnlyCollection<DateOnly> dates,
        IReadOnlyCollection<int> removeIds,
        AvailabilityDay.Span? added,
        AvailabilityDay.Span? erased)
    {
        if (added is not null && erased is not null)
            throw new ArgumentException("A day is painted or erased, never both.", nameof(erased));

        var dateSet = dates.Distinct().ToHashSet();
        var idSet = (removeIds ?? Enumerable.Empty<int>()).Where(id => id > 0).ToHashSet();
        if (dateSet.Count == 0 && idSet.Count == 0) return new List<AvailabilityMark>();

        var own = context.AvailabilityMarks.Where(m => m.GroupId == groupId && m.ProfileId == profileId);

        // Only the member's own marks can be addressed by id (ids of other members are ignored);
        // the days those marks lie on are rewritten together with the listed days
        var listedIds = idSet.ToList();
        var idDates = listedIds.Count == 0
            ? new List<DateOnly>()
            : await own.Where(m => listedIds.Contains(m.Id.Value)).Select(m => m.Date).ToListAsync();

        var daySet = dateSet.Concat(idDates).ToHashSet();
        if (daySet.Count == 0) return new List<AvailabilityMark>(); // the ids belong to someone else: nothing to do

        DateOnly from = daySet.Min();
        DateOnly to = daySet.Max();

        // A date range instead of Contains over a list of dates keeps the query translatable on any provider
        var touched = (await own.Where(m => m.Date >= from && m.Date <= to).ToListAsync())
            .Where(m => daySet.Contains(m.Date))
            .ToList();

        var removed = new List<AvailabilityMark>();
        var kept = new List<AvailabilityMark>();
        var created = new List<AvailabilityMark>();

        // Every touched day is rewritten as a whole, so the stored marks are always the normalized line
        foreach (var date in daySet.OrderBy(d => d))
        {
            var onDay = touched.Where(m => m.Date == date).ToList();
            var listed = dateSet.Contains(date);
            var paint = added is not null && listed ? added : null;
            var wipe = erased is not null && listed ? erased : null;

            if (paint is null && wipe is null && listed)
            {
                removed.AddRange(onDay); // "remove my marks on these days"
                continue;
            }

            removed.AddRange(onDay.Where(m => idSet.Contains(m.Id!.Value)));
            var rest = onDay.Where(m => !idSet.Contains(m.Id!.Value)).ToList();
            var line = AvailabilityDay.Paint(rest.Select(ToSpan), paint, wipe);

            foreach (var span in AvailabilityDay.Extract(line))
            {
                // a span that did not change keeps its row, and with it the id other clients may hold
                var unchanged = rest.FirstOrDefault(m => ToSpan(m).Equals(span));
                if (unchanged is not null)
                {
                    rest.Remove(unchanged);
                    kept.Add(unchanged);
                }
                else
                {
                    created.Add(new AvailabilityMark
                    {
                        GroupId = groupId,
                        ProfileId = profileId,
                        Date = date,
                        Type = span.Type,
                        StartTime = span.Start,
                        EndTime = span.End
                    });
                }
            }

            removed.AddRange(rest);
        }

        if (removed.Count > 0) context.AvailabilityMarks.RemoveRange(removed);
        if (created.Count > 0) context.AvailabilityMarks.AddRange(created);
        if (removed.Count > 0 || created.Count > 0) await context.SaveChangesAsync();

        return kept.Concat(created)
            .OrderBy(m => m.Date)
            .ThenBy(m => m.StartTime ?? TimeOnly.MinValue)
            .ToList();
    }

    public async Task RemoveAllAsync(int groupId, int profileId)
    {
        var marks = await context.AvailabilityMarks
            .Where(m => m.GroupId == groupId && m.ProfileId == profileId)
            .ToListAsync();
        if (marks.Count == 0) return;

        context.AvailabilityMarks.RemoveRange(marks);
        await context.SaveChangesAsync();
    }

    private static AvailabilityDay.Span ToSpan(AvailabilityMark mark) => new(mark.Type, mark.StartTime, mark.EndTime);
}
