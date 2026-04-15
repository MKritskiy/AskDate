namespace AskDate.Application.DTO;

public class NoteDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int GroupId { get; set; }
    public int CreatorProfileId { get; set; }
    public string CreatorName { get; set; } = string.Empty;
    public List<int> ConfirmedProfileIds { get; set; } = new();
    public List<string> ConfirmedProfileNames { get; set; } = new();
}

public class NoteCreateDto
{
    public DateTime Date { get; set; }
}
