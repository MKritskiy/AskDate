namespace AskDate.Domain.Entities;
public class Note : BaseEntity
{
    public DateTime NotedDate { get; set; }
    
    public int GroupId {get; set;}

    public int UserId {get; set;}

    List<Comment> Comments {get; set;} = new List<Comment>();
}