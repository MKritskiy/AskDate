using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AskDate.Web.Controllers;

[ApiController]
[Route("api/notes/{noteId}/comments")]
[Authorize]
public class CommentsController(ICommentService commentService) : ControllerBase
{
    private int ProfileId => int.Parse(Request.Headers["X-Profile-Id"].FirstOrDefault() ?? "0");

    [HttpGet]
    public async Task<IActionResult> GetByNote(int noteId)
    {
        return Ok(await commentService.GetByNoteAsync(noteId));
    }

    [HttpPost]
    public async Task<IActionResult> Create(int noteId, CommentCreateDto dto)
    {
        var comment = await commentService.CreateAsync(noteId, dto, ProfileId);
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