namespace AskDate.Domain.Entities;
public class Participant : BaseEntity
{
    public int GroupId {get; set;}
    public int ProfileId {get; set;}
    public ParticipantRole Role { get; set; }
}

public enum ParticipantRole
{
    Member,
    Creator
}