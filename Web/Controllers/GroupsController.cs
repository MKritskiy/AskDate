using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AskDate.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GroupsController(IGroupService groupService) : ControllerBase
{
    private int ProfileId => this.GetProfileId();

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await groupService.GetAllAsync(ProfileId));
    }

    [HttpGet("{id}")]
    [MemberOfGroup]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await groupService.GetByIdAsync(id));
    }

    /// <summary>Lookup by invite link — the only way to see a group you are not a member of.</summary>
    [HttpGet("invite/{link}")]
    public async Task<IActionResult> GetByInviteLink(string link)
    {
        return Ok(await groupService.GetByInviteLinkAsync(link));
    }

    [HttpPost]
    public async Task<IActionResult> Create(GroupCreateDto dto)
    {
        var group = await groupService.CreateAsync(dto, ProfileId);
        return CreatedAtAction(nameof(GetById), new { id = group.Id }, group);
    }

    [HttpPut("{id}")]
    [MemberOfGroup]
    public async Task<IActionResult> Update(int id, GroupUpdateDto dto)
    {
        return Ok(await groupService.UpdateAsync(id, dto));
    }

    [HttpDelete("{id}")]
    [MemberOfGroup]
    public async Task<IActionResult> Delete(int id)
    {
        await groupService.DeleteAsync(id, ProfileId);
        return NoContent();
    }

    /// <summary>Joins the group. Non-members must send the invite link in the body.</summary>
    [HttpPost("{id}/participants")]
    public async Task<IActionResult> AddParticipant(int id, [FromBody] JoinGroupDto? dto)
    {
        await groupService.AddParticipantAsync(id, ProfileId, dto?.InviteLink);
        return Ok();
    }

    [HttpDelete("{id}/participants/{participantId}")]
    [MemberOfGroup]
    public async Task<IActionResult> RemoveParticipant(int id, int participantId)
    {
        await groupService.RemoveParticipantAsync(id, participantId, ProfileId);
        return NoContent();
    }

    /// <summary>Whether the current member is free on days they did not mark.</summary>
    [HttpPut("{id}/availability-default")]
    [MemberOfGroup]
    public async Task<IActionResult> SetAvailabilityDefault(int id, UnmarkedDaysFreeDto dto)
    {
        await groupService.SetUnmarkedDaysFreeAsync(id, ProfileId, dto.UnmarkedDaysFree);
        return NoContent();
    }
}
