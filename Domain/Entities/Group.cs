namespace AskDate.Domain.Entities;

public class Group :  BaseEntity
{
    public string Name {get; set;} = string.Empty;

    public string InviteLink { get; set; } = string.Empty;
    public int CreatorProfileId { get; set; }

    public List<Note> Notes {get; set;} = new List<Note>();
    public List<Participant> Participants {get; set;} = new List<Participant>();
}
