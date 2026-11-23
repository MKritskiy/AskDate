namespace AskDate.Domain.Entities;
public class Participant : BaseEntity
{
    public int GroupId {get; set;}
    public int ProfileId {get; set;}
    public ParticipantRole Role { get; set; }

    /// <summary>
    /// True when this member is free on every day they did not mark as busy
    /// (for people who "can always, except fixed times"). It only affects the
    /// group availability summary and never changes the meaning of existing marks.
    /// </summary>
    public bool UnmarkedDaysFree { get; set; }
}

public enum ParticipantRole
{
    Member,
    Creator
}
