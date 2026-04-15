using AskDate.Application.DTO;
using AskDate.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AskDate.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GroupsController(IGroupService groupService) : ControllerBase
{
    private int ProfileId => int.Parse(Request.Headers["X-Profile-Id"].FirstOrDefault() ?? "0");

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await groupService.GetAllAsync(ProfileId));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await groupService.GetByIdAsync(id));
    }

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
    public async Task<IActionResult> Update(int id, GroupUpdateDto dto)
    {
        return Ok(await groupService.UpdateAsync(id, dto));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await groupService.DeleteAsync(id, ProfileId);
        return NoContent();
    }

    [HttpPost("{id}/participants")]
    public async Task<IActionResult> AddParticipant(int id)
    {
        await groupService.AddParticipantAsync(id, ProfileId);
        return Ok();
    }

    [HttpDelete("{id}/participants/{participantId}")]
    public async Task<IActionResult> RemoveParticipant(int id, int participantId)
    {
        await groupService.RemoveParticipantAsync(id, participantId, ProfileId);
        return NoContent();
    }
}