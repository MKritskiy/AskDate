using Share.Domain.Common;

namespace AskDate.Domain.Entities;

public class NoteConfirmation : BaseEntity
{
    public int NoteId { get; set; }
    public int ProfileId { get; set; }
}