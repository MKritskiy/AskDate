namespace AskDate.Domain.Entities;
public class Comment : BaseEntity
{
    public string Text {get; set;} = string.Empty;
    public int UserId {get;set;}
    public int NoteId {get; set;}
}