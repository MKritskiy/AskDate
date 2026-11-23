using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AskDate.Web.Controllers;

[ApiController]
[Route("api/groups/{groupId}/notes")]
[Authorize]
public class NotesController(INoteService noteService) : ControllerBase
{
    private int ProfileId => this.GetProfileId();

    // Endpoints that address a group check membership by the route group id;
    // endpoints that address a single note resolve the group through that note,
    // so a note from another group can't be reached via a group you belong to.

    [HttpGet]
    [MemberOfGroup]
    public async Task<IActionResult> GetByGroup(int groupId)
    {
        return Ok(await noteService.GetByGroupAsync(groupId));
    }

    [HttpPost]
    [MemberOfGroup]
    public async Task<IActionResult> Create(int groupId, NoteCreateDto dto)
    {
        var note = await noteService.CreateAsync(groupId, dto, ProfileId);
        return Ok(note);
    }

    [HttpPut("{id}/title")]
    [MemberOfNoteGroup]
    public async Task<IActionResult> UpdateTitle(int groupId, int id, [FromBody] UpdateTitleDto dto)
    {
        if (id < 0)
        {
            // Virtual instance — materialize and update title
            var (parentId, date) = INoteService.DecodeVirtualId(id);
            var result = await noteService.UpdateInstanceTitleAsync(parentId, date, dto.Title, ProfileId);
            return Ok(result);
        }

        var note = await noteService.UpdateTitleAsync(id, dto.Title, ProfileId);
        return Ok(note);
    }

    [HttpDelete("{id}")]
    [MemberOfNoteGroup]
    public async Task<IActionResult> Delete(int groupId, int id)
    {
        if (id < 0)
        {
            // Virtual instance — can't delete individually, return error
            return BadRequest("Cannot delete a virtual instance. Delete the series instead.");
        }
        await noteService.DeleteAsync(id, ProfileId);
        return NoContent();
    }

    [HttpDelete("{id}/series")]
    [MemberOfNoteGroup]
    public async Task<IActionResult> DeleteSeries(int groupId, int id)
    {
        // For series delete, id must be a real parent note ID (positive)
        if (id < 0)
        {
            // If they somehow pass a virtual ID, decode and use the parent
            id = INoteService.DecodeVirtualId(id).parentId;
        }
        await noteService.DeleteSeriesAsync(id, ProfileId);
        return NoContent();
    }

    [HttpPost("{id}/confirm")]
    [MemberOfNoteGroup]
    public async Task<IActionResult> Confirm(int groupId, int id)
    {
        if (id < 0)
        {
            // Virtual instance — materialize and confirm
            var (parentId, date) = INoteService.DecodeVirtualId(id);
            await noteService.ConfirmInstanceAsync(parentId, date, ProfileId);
        }
        else
        {
            await noteService.ConfirmNoteAsync(id, ProfileId);
        }
        return Ok();
    }

    [HttpDelete("{id}/confirm")]
    [MemberOfNoteGroup]
    public async Task<IActionResult> Unconfirm(int groupId, int id)
    {
        if (id < 0)
        {
            // Virtual instance — unconfirm
            var (parentId, date) = INoteService.DecodeVirtualId(id);
            await noteService.UnconfirmInstanceAsync(parentId, date, ProfileId);
        }
        else
        {
            await noteService.UnconfirmNoteAsync(id, ProfileId);
        }
        return NoContent();
    }

    [HttpPost("{id}/confirm/series")]
    [MemberOfNoteGroup]
    public async Task<IActionResult> ConfirmSeries(int groupId, int id)
    {
        if (id < 0)
        {
            id = INoteService.DecodeVirtualId(id).parentId;
        }
        await noteService.ConfirmSeriesAsync(id, ProfileId);
        return Ok();
    }

    [HttpDelete("{id}/confirm/series")]
    [MemberOfNoteGroup]
    public async Task<IActionResult> UnconfirmSeries(int groupId, int id)
    {
        if (id < 0)
        {
            id = INoteService.DecodeVirtualId(id).parentId;
        }
        await noteService.UnconfirmSeriesAsync(id, ProfileId);
        return NoContent();
    }
}
