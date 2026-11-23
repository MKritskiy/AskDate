namespace AskDate.Domain.Entities;

/// <summary>Kind of a personal availability mark.</summary>
public enum AvailabilityType
{
    Free = 1,
    Busy = 2
}

/// <summary>
/// A member's personal availability on one day, either for the whole day or for a time interval.
/// Independent of events: Free = "I am available", Busy = "I am not available".
/// The type is stored per mark, so it never changes with the tool used to place it.
/// Visible to every member of the group. One member's marks on a day never overlap:
/// the server merges neighbours of the same type and lets a newer mark override the other type.
/// </summary>
public class AvailabilityMark : BaseEntity
{
    public int GroupId { get; set; }
    public int ProfileId { get; set; }
    public DateOnly Date { get; set; }
    public AvailabilityType Type { get; set; }

    /// <summary>
    /// Wall-clock start of an interval. Null together with <see cref="EndTime"/>: the whole day.
    /// Times are local to the group's members and are never converted between time zones.
    /// </summary>
    public TimeOnly? StartTime { get; set; }

    /// <summary>
    /// Exclusive end of the interval on the same day. Null while <see cref="StartTime"/> is set:
    /// until the end of the day (TimeOnly cannot express 24:00).
    /// </summary>
    public TimeOnly? EndTime { get; set; }
}
