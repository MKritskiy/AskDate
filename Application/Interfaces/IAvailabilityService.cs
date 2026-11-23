using AskDate.Application.DTO;
using AskDate.Domain;
using AskDate.Domain.Entities;

namespace AskDate.Application.Interfaces;

public interface IAvailabilityMarkRepository
{
    Task<List<AvailabilityMark>> GetByGroupAsync(int groupId);

    /// <summary>
    /// Rewrites the member's marks on the touched days as a whole: the marks listed in
    /// <paramref name="removeIds"/> disappear, <paramref name="added"/> (when set) is painted on
    /// top of what remains, and the result is stored normalized. Unchanged spans keep their ids.
    /// </summary>
    /// <returns>The member's marks on every day that was touched.</returns>
    Task<List<AvailabilityMark>> ApplyAsync(
        int groupId,
        int profileId,
        IReadOnlyCollection<DateOnly> dates,
        IReadOnlyCollection<int> removeIds,
        AvailabilityDay.Span? added);

    Task RemoveAllAsync(int groupId, int profileId);
}

public interface IAvailabilityService
{
    /// <summary>Upper bound for dates accepted in a single set/remove request.</summary>
    const int MaxDatesPerRequest = 366;

    /// <remarks>Callers are responsible for checking group membership.</remarks>
    Task<List<AvailabilityMarkDto>> GetByGroupAsync(int groupId, int profileId);

    /// <summary>
    /// Adds a mark on every day. The result (the caller's marks on those days, normalized)
    /// is returned so that the client can show exactly what was stored.
    /// </summary>
    Task<List<AvailabilityMarkDto>> SetAsync(
        int groupId,
        int profileId,
        IReadOnlyCollection<DateOnly> dates,
        AvailabilityType type,
        TimeOnly? start,
        TimeOnly? end,
        IReadOnlyCollection<int>? replaceIds);

    /// <summary>Removes own marks by id, or every own mark on the given days. Returns the marks left on the touched days.</summary>
    Task<List<AvailabilityMarkDto>> RemoveAsync(int groupId, int profileId, IReadOnlyCollection<int> ids, IReadOnlyCollection<DateOnly> dates);

    Task RemoveAllAsync(int groupId, int profileId);
}
