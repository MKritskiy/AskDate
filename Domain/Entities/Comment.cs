namespace AskDate.Domain.Entities;
public class Comment : BaseEntity
{
    public string Content {get; set;} = string.Empty;
    public int AuthorProfileId {get;set;}
    public int NoteId {get; set;}
}