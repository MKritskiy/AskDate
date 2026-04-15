namespace AskDate.Application.DTO;

public class CommentDto
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public int AuthorProfileId { get; set; }
    public string AuthorName { get; set; } = string.Empty;
    public int NoteId { get; set; }
    public DateTimeOffset Created { get; set; }
    public DateTimeOffset LastModified { get; set; }
}

public class CommentCreateDto
{
    public string Content { get; set; } = string.Empty;
}

public class CommentUpdateDto
{
    public string Content { get; set; } = string.Empty;
}
