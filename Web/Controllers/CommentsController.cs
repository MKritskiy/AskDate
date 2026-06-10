using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AskDate.Web.Controllers;

[ApiController]
[Route("api/notes/{noteId}/comments")]
[Authorize]
public class CommentsController(ICommentService commentService, INoteService noteService, ILogger<CommentsController> logger) : ControllerBase
{
    private int ProfileId => int.Parse(Request.Headers["X-Profile-Id"].FirstOrDefault() ?? "0");

    private async Task<int> ResolveNoteIdAsync(int noteId)
    {
        if (noteId < 0)
        {
            // Virtual instance — materialize it first, return the real child ID
            var (parentId, date) = INoteService.DecodeVirtualId(noteId);
            logger.LogInformation("Materializing virtual note: noteId={NoteId} -> parentId={ParentId}, date={Date}", noteId, parentId, date);
            try
            {
                var realId = await noteService.MaterializeInstanceAsync(parentId, date);
                logger.LogInformation("Materialized to realId={RealId}", realId);
                return realId;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to materialize virtual note: noteId={NoteId}, parentId={ParentId}, date={Date}", noteId, parentId, date);
                throw;
            }
        }
        return noteId;
    }

    [HttpGet]
    public async Task<IActionResult> GetByNote(int noteId)
    {
        var realId = await ResolveNoteIdAsync(noteId);
        return Ok(await commentService.GetByNoteAsync(realId));
    }

    [HttpPost]
    public async Task<IActionResult> Create(int noteId, CommentCreateDto dto)
    {
        var realId = await ResolveNoteIdAsync(noteId);
        var comment = await commentService.CreateAsync(realId, dto, ProfileId);
        return Ok(comment);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int noteId, int id, CommentUpdateDto dto)
    {
        await commentService.UpdateAsync(id, dto, ProfileId);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int noteId, int id)
    {
        await commentService.DeleteAsync(id, ProfileId);
        return NoContent();
    }
}
