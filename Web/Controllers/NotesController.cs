using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AskDate.Web.Controllers;

[ApiController]
[Route("api/groups/{groupId}/notes")]
[Authorize]
public class NotesController(INoteService noteService) : ControllerBase
{
    private int ProfileId => int.Parse(Request.Headers["X-Profile-Id"].FirstOrDefault() ?? "0");

    [HttpGet]
    public async Task<IActionResult> GetByGroup(int groupId)
    {
        return Ok(await noteService.GetByGroupAsync(groupId));
    }

    [HttpPost]
    public async Task<IActionResult> Create(int groupId, NoteCreateDto dto)
    {
        var note = await noteService.CreateAsync(groupId, dto, ProfileId);
        return Ok(note);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int groupId, int id)
    {
        await noteService.DeleteAsync(id, ProfileId);
        return NoContent();
    }

    [HttpPost("{id}/confirm")]
    public async Task<IActionResult> Confirm(int groupId, int id)
    {
        await noteService.ConfirmNoteAsync(id, ProfileId);
        return Ok();
    }

    [HttpDelete("{id}/confirm")]
    public async Task<IActionResult> Unconfirm(int groupId, int id)
    {
        await noteService.UnconfirmNoteAsync(id, ProfileId);
        return NoContent();
    }
}