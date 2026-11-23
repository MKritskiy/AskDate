using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using AskDate.Domain;
using AskDate.Domain.Entities;
using System.Globalization;

namespace AskDate.Application.Services;

/// <summary>
/// Personal free/busy marks of group members. Marks are typed when placed and
/// stay that way — switching tools never reinterprets days marked earlier.
/// </summary>
public class AvailabilityService(
    IAvailabilityMarkRepository availabilityMarkRepository,
    IRealtimeNotifier realtimeNotifier) : IAvailabilityService
{
    /// <summary>Upper bound for ids accepted in one remove/replace request.</summary>
    public const int MaxIdsPerRequest = 1000;

    public async Task<List<AvailabilityMarkDto>> GetByGroupAsync(int groupId, int profileId)
    {
        var marks = await availabilityMarkRepository.GetByGroupAsync(groupId);
        return marks.Select(Map).ToList();
    }

    public async Task<List<AvailabilityMarkDto>> SetAsync(
        int groupId,
        int profileId,
        IReadOnlyCollection<DateOnly> dates,
        AvailabilityType type,
        TimeOnly? start,
        TimeOnly? end,
        IReadOnlyCollection<int>? replaceIds)
    {
        ValidateDates(dates);
        CheckIds(replaceIds);
        if (!Enum.IsDefined(type))
            throw new ArgumentException("Unknown availability type.", nameof(type));

        var added = new AvailabilityDay.Span(type, start, end);
        AvailabilityDay.Validate(added);

        var marks = await availabilityMarkRepository.ApplyAsync(groupId, profileId, dates, replaceIds ?? Array.Empty<int>(), added);
        await realtimeNotifier.NotifyAvailabilityChangedAsync(groupId);
        return marks.Select(Map).ToList();
    }

    public async Task<List<AvailabilityMarkDto>> RemoveAsync(int groupId, int profileId, IReadOnlyCollection<int> ids, IReadOnlyCollection<DateOnly> dates)
    {
        CheckIds(ids);
        ValidateDates(dates);
        if (ids.Count == 0 && dates.Count == 0)
            throw new ArgumentException("Provide mark ids or dates to remove.", nameof(ids));

        var marks = await availabilityMarkRepository.ApplyAsync(groupId, profileId, dates, ids, null);
        await realtimeNotifier.NotifyAvailabilityChangedAsync(groupId);
        return marks.Select(Map).ToList();
    }

    public async Task RemoveAllAsync(int groupId, int profileId)
    {
        await availabilityMarkRepository.RemoveAllAsync(groupId, profileId);
        await realtimeNotifier.NotifyAvailabilityChangedAsync(groupId);
    }

    private static void ValidateDates(IReadOnlyCollection<DateOnly> dates)
    {
        if (dates is null || dates.Count > IAvailabilityService.MaxDatesPerRequest)
            throw new ArgumentException($"At most {IAvailabilityService.MaxDatesPerRequest} dates per request.", nameof(dates));
    }

    private static void CheckIds(IReadOnlyCollection<int>? ids)
    {
        if (ids is not null && ids.Count > MaxIdsPerRequest)
            throw new ArgumentException($"At most {MaxIdsPerRequest} mark ids per request.", nameof(ids));
    }

    // Times travel as short local strings: no time-zone conversions, minute precision.
    // A start without an end runs until the end of the day, shown as "24:00".
    private static AvailabilityMarkDto Map(AvailabilityMark mark) => new()
    {
        Id = mark.Id ?? 0,
        ProfileId = mark.ProfileId,
        Date = mark.Date,
        Type = mark.Type,
        StartTime = mark.StartTime?.ToString("HH:mm", CultureInfo.InvariantCulture),
        EndTime = mark.StartTime is null ? null : (mark.EndTime?.ToString("HH:mm", CultureInfo.InvariantCulture) ?? "24:00")
    };
}
