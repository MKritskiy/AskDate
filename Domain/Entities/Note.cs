namespace AskDate.Domain.Entities;
public class Note : BaseEntity
{
    public DateTime Date { get; set; }

    public int GroupId {get; set;}

    public int CreatorProfileId {get; set;}

    public List<Comment> Comments {get; set;} = new List<Comment>();
    public List<NoteConfirmation> Confirmations { get; set; } = new List<NoteConfirmation>();
}