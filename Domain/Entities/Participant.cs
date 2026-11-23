namespace AskDate.Domain.Entities;
public class Participant : BaseEntity
{
    public int GroupId {get; set;}
    public int ProfileId {get; set;}
    public ParticipantRole Role { get; set; }

    /// <summary>
    /// How this participant's calendar marks are interpreted:
    /// Free = marks are the days they ARE available (default),
    /// Busy = marks are the days they are NOT available (everything unmarked is available).
    /// </summary>
    public AvailabilityMode AvailabilityMode { get; set; } = AvailabilityMode.Free;
}

public enum AvailabilityMode
{
    Free = 0,
    Busy = 1
}

public enum ParticipantRole
{
    Member,
    Creator
}