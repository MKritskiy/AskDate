using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using AskDate.Domain.Entities;

namespace AskDate.Application.Services;

public class NoteService(INoteRepository noteRepository, INoteConfirmationRepository noteConfirmationRepository, IGroupRepository groupRepository, IProfileApiClient profileApiClient) : INoteService
{
    public async Task<List<NoteDto>> GetByGroupAsync(int groupId)
    {
        var notes = await noteRepository.Get(n => n.GroupId == groupId);
        var allNoteIds = notes.Select(nx => (int?)nx.Id).ToList();
        var confirmations = await noteConfirmationRepository.Get(c => allNoteIds.Contains(c.NoteId));

        var allProfileIds = notes.Select(n => n.CreatorProfileId)
            .Concat(confirmations.Select(c => c.ProfileId))
            .Distinct().ToList();

        var names = await profileApiClient.GetProfileNamesAsync(allProfileIds);

        var result = new List<NoteDto>();

        // Build a set of (parentId, date) for existing real children to avoid duplicating virtual instances
        var realChildDates = new HashSet<string>();
        foreach (var n in notes)
        {
            if (n.ParentNoteId.HasValue)
            {
                realChildDates.Add($"{n.ParentNoteId.Value}:{n.Date.Date:O}");
            }
        }

        foreach (var note in notes)
        {
            var dto = Map(note);
            dto.CreatorName = names.GetValueOrDefault(note.CreatorProfileId, "Unknown");
            dto.ConfirmedProfileIds = confirmations.Where(c => c.NoteId == note.Id).Select(c => c.ProfileId).ToList();
            dto.ConfirmedProfileNames = dto.ConfirmedProfileIds.Select(id => names.GetValueOrDefault(id, "Unknown")).ToList();

            result.Add(dto);

            // If this is a parent note with recurrence, generate virtual instances
            if (note.RecurrenceType != RecurrenceType.None && !note.ParentNoteId.HasValue)
            {
                var parentConfs = confirmations.Where(c => c.NoteId == note.Id).Select(c => c.ProfileId).ToList();
                var parentConfNames = parentConfs.Select(id => names.GetValueOrDefault(id, "Unknown")).ToList();

                var rangeStart = DateTime.UtcNow.AddMonths(-3);
                var rangeEnd = DateTime.UtcNow.AddMonths(12);
                var virtualDates = GenerateRecurrenceDatesInRange(note, rangeStart, rangeEnd);

                foreach (var vDate in virtualDates)
                {
                    // Skip if a real child already exists for this date
                    var dateKey = $"{note.Id}:{vDate.Date:O}";
                    if (realChildDates.Contains(dateKey)) continue;

                    var virtualDto = new NoteDto
                    {
                        Id = INoteService.EncodeVirtualId(note.Id ?? 0, vDate),
                        Date = vDate,
                        Title = note.Title,
                        GroupId = note.GroupId,
                        CreatorProfileId = note.CreatorProfileId,
                        CreatorName = dto.CreatorName,
                        RecurrenceType = "none",
                        RecurrenceInterval = 1,
                        ParentNoteId = note.Id,
                        IsVirtual = true,
                        ConfirmedProfileIds = new List<int>(),
                        ConfirmedProfileNames = new List<string>()
                    };
                    result.Add(virtualDto);
                }
            }
        }

        return result;
    }

    public async Task<NoteDto> CreateAsync(int groupId, NoteCreateDto dto, int profileId)
    {
        var recurrenceType = ParseRecurrenceType(dto.RecurrenceType);

        var note = new Note
        {
            Date = dto.Date,
            Title = dto.Title,
            GroupId = groupId,
            CreatorProfileId = profileId,
            RecurrenceType = recurrenceType,
            RecurrenceInterval = dto.RecurrenceInterval > 0 ? dto.RecurrenceInterval : 1,
            RecurrenceEndDate = dto.RecurrenceEndDate,
            RecurrenceCount = dto.RecurrenceCount,
            RecurrenceDaysOfWeek = dto.RecurrenceDaysOfWeek
        };

        await noteRepository.AddAsync(note);
        // Creator confirms the parent note
        await noteConfirmationRepository.AddAsync(new NoteConfirmation { NoteId = note.Id ?? 0, ProfileId = profileId });

        // For recurring notes, batch-create child notes + confirmations
        if (recurrenceType != RecurrenceType.None)
        {
            var rangeStart = DateTime.UtcNow.AddMonths(-3);
            var rangeEnd = DateTime.UtcNow.AddMonths(12);
            var virtualDates = GenerateRecurrenceDatesInRange(note, rangeStart, rangeEnd);

            if (virtualDates.Count > 0)
            {
                var newChildren = virtualDates.Select(vDate =>
                {
                    var utcDate = vDate.Kind == DateTimeKind.Unspecified
                        ? DateTime.SpecifyKind(vDate.Date, DateTimeKind.Utc)
                        : vDate.Date.ToUniversalTime();
                    return new Note
                    {
                        Date = utcDate,
                        Title = note.Title,
                        GroupId = note.GroupId,
                        CreatorProfileId = note.CreatorProfileId,
                        RecurrenceType = RecurrenceType.None,
                        ParentNoteId = note.Id
                    };
                }).ToList();

                await noteRepository.AddRangeAsync(newChildren);

                var newConfs = newChildren
                    .Select(c => new NoteConfirmation { NoteId = c.Id ?? 0, ProfileId = profileId })
                    .ToList();
                await noteConfirmationRepository.AddRangeAsync(newConfs);
            }
        }

        var res = Map(note);
        res.ConfirmedProfileIds = new List<int> { profileId };

        var names = await profileApiClient.GetProfileNamesAsync(new[] { profileId });
        res.CreatorName = names.GetValueOrDefault(profileId, "Unknown");
        res.ConfirmedProfileNames = new List<string> { res.CreatorName };

        return res;
    }

    public async Task DeleteAsync(int id, int profileId)
    {
        var note = await noteRepository.GetByIdAsync(id);
        if (note == null) return;

        var group = await groupRepository.GetByIdAsync(note.GroupId);

        if (note.CreatorProfileId == profileId || (group != null && group.CreatorProfileId == profileId))
        {
            await noteRepository.DeleteByIdAsync(id);
        }
        else
        {
            throw new UnauthorizedAccessException("You are not allowed to delete this note.");
        }
    }

    public async Task DeleteSeriesAsync(int parentNoteId, int profileId)
    {
        // Try to get parent note — but don't fail if it's already deleted (orphan cleanup)
        var parentNote = await noteRepository.GetByIdAsync(parentNoteId);

        // Permission check: use parent if exists, otherwise check via children
        if (parentNote != null)
        {
            var group = await groupRepository.GetByIdAsync(parentNote.GroupId);
            if (parentNote.CreatorProfileId != profileId && (group == null || group.CreatorProfileId != profileId))
            {
                throw new UnauthorizedAccessException("You are not allowed to delete this series.");
            }
        }

        // Get all child notes
        var children = await noteRepository.Get(n => n.ParentNoteId == parentNoteId);
        var childIds = children.Select(c => c.Id ?? 0).Where(id => id > 0).ToList();

        // Batch delete all child confirmations
        if (childIds.Count > 0)
        {
            var childConfirmations = await noteConfirmationRepository.Get(c => childIds.Contains(c.NoteId));
            if (childConfirmations.Any())
            {
                await noteConfirmationRepository.DeleteRangeAsync(childConfirmations);
            }
        }

        // Batch delete all children
        if (children.Any())
        {
            await noteRepository.DeleteRangeAsync(children);
        }

        // Delete parent confirmations and parent itself
        if (parentNote != null)
        {
            var parentConfirmations = await noteConfirmationRepository.Get(c => c.NoteId == parentNoteId);
            if (parentConfirmations.Any())
            {
                await noteConfirmationRepository.DeleteRangeAsync(parentConfirmations);
            }
            await noteRepository.DeleteByIdAsync(parentNoteId);
        }
    }

    public async Task ConfirmSeriesAsync(int parentNoteId, int profileId)
    {
        // Confirm the parent note itself
        await ConfirmNoteAsync(parentNoteId, profileId);

        // Confirm all existing real child instances (batch)
        var children = await noteRepository.Get(n => n.ParentNoteId == parentNoteId);
        var childIds = children.Select(c => c.Id ?? 0).ToList();

        // Check which children already have this user's confirmation
        var existingConfs = await noteConfirmationRepository.Get(c =>
            childIds.Contains(c.NoteId) && c.ProfileId == profileId);
        var alreadyConfirmedIds = new HashSet<int>(existingConfs.Select(c => c.NoteId));

        // Add missing confirmations for existing children
        var newChildConfs = childIds
            .Where(id => !alreadyConfirmedIds.Contains(id))
            .Select(id => new NoteConfirmation { NoteId = id, ProfileId = profileId })
            .ToList();

        if (newChildConfs.Count > 0)
        {
            await noteConfirmationRepository.AddRangeAsync(newChildConfs);
        }

        // Materialize and confirm all virtual instances in the visible range (batch)
        var parent = await noteRepository.GetByIdAsync(parentNoteId);
        if (parent != null && parent.RecurrenceType != RecurrenceType.None)
        {
            var rangeStart = DateTime.UtcNow.AddMonths(-3);
            var rangeEnd = DateTime.UtcNow.AddMonths(12);
            var virtualDates = GenerateRecurrenceDatesInRange(parent, rangeStart, rangeEnd);

            // Get already-materialized dates to skip them
            var existingDates = new HashSet<string>(
                children.Select(c => c.Date.Date.ToString("O")));

            // Build all new child notes in memory
            var newChildren = new List<Note>();
            foreach (var vDate in virtualDates)
            {
                if (existingDates.Contains(vDate.Date.ToString("O"))) continue;

                var utcDate = vDate.Kind == DateTimeKind.Unspecified
                    ? DateTime.SpecifyKind(vDate.Date, DateTimeKind.Utc)
                    : vDate.Date.ToUniversalTime();

                newChildren.Add(new Note
                {
                    Date = utcDate,
                    Title = parent.Title,
                    GroupId = parent.GroupId,
                    CreatorProfileId = parent.CreatorProfileId,
                    RecurrenceType = RecurrenceType.None,
                    ParentNoteId = parentNoteId
                });
            }

            // Bulk insert all new children (single SaveChanges)
            if (newChildren.Count > 0)
            {
                await noteRepository.AddRangeAsync(newChildren);

                // Now all children have their IDs — bulk insert confirmations
                var newConfs = newChildren
                    .Select(c => new NoteConfirmation { NoteId = c.Id ?? 0, ProfileId = profileId })
                    .ToList();
                await noteConfirmationRepository.AddRangeAsync(newConfs);
            }
        }
    }

    public async Task UnconfirmSeriesAsync(int parentNoteId, int profileId)
    {
        // Unconfirm the parent note itself
        await UnconfirmNoteAsync(parentNoteId, profileId);

        // Unconfirm all existing real child instances
        var children = await noteRepository.Get(n => n.ParentNoteId == parentNoteId);
        foreach (var child in children)
        {
            await UnconfirmNoteAsync(child.Id ?? 0, profileId);
        }
    }

    public async Task ConfirmNoteAsync(int id, int profileId)
    {
        var existing = await noteConfirmationRepository.Get(c => c.NoteId == id && c.ProfileId == profileId);
        if (!existing.Any())
        {
            await noteConfirmationRepository.AddAsync(new NoteConfirmation { NoteId = id, ProfileId = profileId });
        }
    }

    public async Task UnconfirmNoteAsync(int id, int profileId)
    {
        var existing = await noteConfirmationRepository.Get(c => c.NoteId == id && c.ProfileId == profileId);
        if (existing.Any())
        {
            await noteConfirmationRepository.DeleteByIdAsync(existing.First().Id);
        }
    }

    public async Task<NoteDto> UpdateTitleAsync(int id, string? title, int profileId)
    {
        var note = await noteRepository.GetByIdAsync(id);
        if (note == null) throw new KeyNotFoundException("Note not found.");

        var group = await groupRepository.GetByIdAsync(note.GroupId);
        if (note.CreatorProfileId != profileId && (group == null || group.CreatorProfileId != profileId))
        {
            throw new UnauthorizedAccessException("You are not allowed to edit this note.");
        }

        note.Title = string.IsNullOrWhiteSpace(title) ? null : title.Trim();
        await noteRepository.UpdateAsync(note);

        return Map(note);
    }

    // --- Virtual Instance Methods ---

    public async Task<int> MaterializeInstanceAsync(int parentId, DateTime date)
    {
        // Ensure date is UTC for PostgreSQL timestamptz compatibility
        var utcDate = date.Kind == DateTimeKind.Unspecified
            ? DateTime.SpecifyKind(date.Date, DateTimeKind.Utc)
            : date.Date.ToUniversalTime();

        // Check if a real child already exists for this parent+date
        var existing = await noteRepository.Get(n =>
            n.ParentNoteId == parentId && n.Date.Date == utcDate.Date);

        if (existing.Any())
        {
            return existing.First().Id ?? 0;
        }

        var parent = await noteRepository.GetByIdAsync(parentId);
        if (parent == null) throw new KeyNotFoundException("Parent note not found.");

        var child = new Note
        {
            Date = utcDate,
            Title = parent.Title,
            GroupId = parent.GroupId,
            CreatorProfileId = parent.CreatorProfileId,
            RecurrenceType = RecurrenceType.None,
            ParentNoteId = parentId
        };

        await noteRepository.AddAsync(child);

        // Do NOT copy parent confirmations — each child has independent participation
        return child.Id ?? 0;
    }

    public async Task ConfirmInstanceAsync(int parentId, DateTime date, int profileId)
    {
        var realId = await MaterializeInstanceAsync(parentId, date);
        await ConfirmNoteAsync(realId, profileId);
    }

    public async Task UnconfirmInstanceAsync(int parentId, DateTime date, int profileId)
    {
        // If a real child exists, unconfirm the user on it
        var utcDate = date.Kind == DateTimeKind.Unspecified
            ? DateTime.SpecifyKind(date.Date, DateTimeKind.Utc)
            : date.Date.ToUniversalTime();

        var existing = await noteRepository.Get(n =>
            n.ParentNoteId == parentId && n.Date.Date == utcDate.Date);

        if (existing.Any())
        {
            await UnconfirmNoteAsync(existing.First().Id ?? 0, profileId);
        }
        // If no real child exists, the virtual instance has no participants — nothing to unconfirm
    }

    public async Task<NoteDto> UpdateInstanceTitleAsync(int parentId, DateTime date, string? title, int profileId)
    {
        var realId = await MaterializeInstanceAsync(parentId, date);
        return await UpdateTitleAsync(realId, title, profileId);
    }

    // --- Private Helpers ---

    private static RecurrenceType ParseRecurrenceType(string? type)
    {
        return type?.ToLower() switch
        {
            "daily" => RecurrenceType.Daily,
            "weekly" => RecurrenceType.Weekly,
            "monthly" => RecurrenceType.Monthly,
            _ => RecurrenceType.None
        };
    }

    private static string RecurrenceTypeToString(RecurrenceType type)
    {
        return type switch
        {
            RecurrenceType.Daily => "daily",
            RecurrenceType.Weekly => "weekly",
            RecurrenceType.Monthly => "monthly",
            _ => "none"
        };
    }

    /// <summary>
    /// Generates recurrence dates within a specific date range (for virtual instance display).
    /// Does NOT include the parent note's own date.
    /// </summary>
    private static List<DateTime> GenerateRecurrenceDatesInRange(Note parentNote, DateTime rangeStart, DateTime rangeEnd)
    {
        var dates = new List<DateTime>();
        var startDate = parentNote.Date.Date;
        var interval = parentNote.RecurrenceInterval > 0 ? parentNote.RecurrenceInterval : 1;

        // Determine the effective end of the recurrence series
        DateTime? seriesEnd = parentNote.RecurrenceEndDate?.Date;
        int? maxOccurrences = parentNote.RecurrenceCount;

        // If no end date and no count, generate within the requested range only
        // (this is the key change — no more 2-year generation!)

        int occurrenceCount = 0;
        int safetyLimit = 1000; // Absolute safety cap

        switch (parentNote.RecurrenceType)
        {
            case RecurrenceType.Daily:
                {
                    // Start from the first occurrence after the parent date
                    var current = startDate.AddDays(interval);
                    // If the range starts after the parent, fast-forward
                    if (rangeStart > current)
                    {
                        var daysToSkip = (int)((rangeStart.Date - current).TotalDays);
                        var intervalsToSkip = daysToSkip / interval;
                        current = current.AddDays(intervalsToSkip * interval);
                        occurrenceCount += intervalsToSkip;
                    }

                    while (current <= rangeEnd && current <= (seriesEnd ?? DateTime.MaxValue) && occurrenceCount < (maxOccurrences ?? int.MaxValue) && dates.Count < safetyLimit)
                    {
                        if (current >= rangeStart)
                        {
                            dates.Add(current);
                        }
                        occurrenceCount++;
                        current = current.AddDays(interval);
                    }
                    break;
                }
            case RecurrenceType.Weekly:
                {
                    var dayNumbers = ParseDaysOfWeek(parentNote.RecurrenceDaysOfWeek);
                    if (dayNumbers.Count == 0)
                    {
                        dayNumbers = new List<int> { (int)startDate.DayOfWeek == 0 ? 7 : (int)startDate.DayOfWeek };
                    }

                    // Find Monday of the startDate's week
                    var weekStart = GetMondayOfWeek(startDate);

                    // Fast-forward to range start
                    if (rangeStart > weekStart)
                    {
                        var weeksToSkip = (int)((rangeStart.Date - weekStart).TotalDays) / (7 * interval);
                        weekStart = weekStart.AddDays(weeksToSkip * 7L * interval);
                    }

                    int iterations = 0;
                    while (weekStart <= rangeEnd && iterations < safetyLimit)
                    {
                        foreach (var dayNum in dayNumbers.OrderBy(d => d))
                        {
                            var dayOfWeek = dayNum == 7 ? DayOfWeek.Sunday : (DayOfWeek)dayNum;
                            var targetDate = GetNextWeekdayFromWeekStart(weekStart, dayOfWeek);

                            // Skip dates on or before the parent note's own date
                            if (targetDate <= startDate) continue;
                            if (targetDate > rangeEnd) break;
                            if (seriesEnd.HasValue && targetDate > seriesEnd.Value) break;
                            if (maxOccurrences.HasValue && occurrenceCount >= maxOccurrences.Value) break;

                            if (targetDate >= rangeStart)
                            {
                                dates.Add(targetDate);
                            }
                            occurrenceCount++;
                        }
                        if (seriesEnd.HasValue && weekStart > seriesEnd.Value) break;
                        if (maxOccurrences.HasValue && occurrenceCount >= maxOccurrences.Value) break;
                        weekStart = weekStart.AddDays(7L * interval);
                        iterations++;
                    }
                    break;
                }
            case RecurrenceType.Monthly:
                {
                    var current = startDate.AddMonths(interval);
                    // Fast-forward
                    if (rangeStart > current)
                    {
                        var monthsToSkip = ((rangeStart.Year - current.Year) * 12 + rangeStart.Month - current.Month) / interval;
                        current = current.AddMonths(monthsToSkip * interval);
                        occurrenceCount += monthsToSkip;
                    }

                    while (current <= rangeEnd && current <= (seriesEnd ?? DateTime.MaxValue) && occurrenceCount < (maxOccurrences ?? int.MaxValue) && dates.Count < safetyLimit)
                    {
                        if (current >= rangeStart)
                        {
                            dates.Add(current);
                        }
                        occurrenceCount++;
                        current = current.AddMonths(interval);
                    }
                    break;
                }
        }

        return dates;
    }

    private static List<int> ParseDaysOfWeek(string? daysStr)
    {
        if (string.IsNullOrWhiteSpace(daysStr)) return new List<int>();
        return daysStr.Split(',', StringSplitOptions.RemoveEmptyEntries)
                      .Select(s => int.TryParse(s.Trim(), out var d) ? d : 0)
                      .Where(d => d >= 1 && d <= 7)
                      .Distinct()
                      .ToList();
    }

    private static DateTime GetNextWeekdayFromWeekStart(DateTime weekStart, DayOfWeek targetDay)
    {
        int offset = (int)targetDay - (int)DayOfWeek.Monday;
        if (offset < 0) offset += 7;
        return weekStart.AddDays(offset);
    }

    private static DateTime GetMondayOfWeek(DateTime date)
    {
        int dayOfWeek = (int)date.DayOfWeek;
        // DayOfWeek: Sunday=0, Monday=1, ..., Saturday=6
        // Convert to Monday=0, Tuesday=1, ..., Sunday=6
        int offset = dayOfWeek == 0 ? 6 : dayOfWeek - 1;
        return date.Date.AddDays(-offset);
    }

    private static NoteDto Map(Note note)
    {
        return new NoteDto
        {
            Id = note.Id ?? 0,
            Date = note.Date,
            Title = note.Title,
            GroupId = note.GroupId,
            CreatorProfileId = note.CreatorProfileId,
            RecurrenceType = note.ParentNoteId.HasValue ? "none" : RecurrenceTypeToString(note.RecurrenceType),
            RecurrenceInterval = note.RecurrenceInterval,
            RecurrenceEndDate = note.RecurrenceEndDate,
            RecurrenceCount = note.RecurrenceCount,
            RecurrenceDaysOfWeek = note.RecurrenceDaysOfWeek,
            ParentNoteId = note.ParentNoteId
        };
    }
}
