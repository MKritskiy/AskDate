using Microsoft.AspNetCore.Mvc;
using Users.Application.Interfaces;
using Users.Application.Models;
using Users.Domain.Entities;

namespace Users.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController(IProfileService ProfileService) : ControllerBase
{
    [HttpPost("add")]
    public async Task<IActionResult> AddProfile([FromBody] AddProfileDto addProfileDto)
    {
        try
        {
            var profileId = await ProfileService.AddProfile(addProfileDto.ToProfileModel());
            return Ok(profileId);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPut("{profileId:int}")]
    public async Task<IActionResult> UpdateProfile(int profileId, [FromBody] Profile updatedProfile)
    {
        try
        {
            var current = await ProfileService.GetProfileById(profileId);
            if (current == null || current.Id == null) return NotFound();

            current.FirstName = updatedProfile.FirstName;
            current.LastName = updatedProfile.LastName;
            // update age, gender, about are removed per user request, but backend keeps them as is if needed, or we just don't set them
            // leaving them as they are or setting to defaults is fine, we'll just not update them if we want to remove them.

            await ProfileService.UpdateProfile(current);
            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("delete/{profileId}")]
    public async Task<IActionResult> DeleteProfile(int profileId)
    {
        try
        {
            await ProfileService.DeleteProfile(profileId);
            return Ok();
        }
        catch (InvalidOperationException)
        {
            return NotFound("Profile not found.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("{profileId:int}")]
    public async Task<ActionResult<Profile?>> GetProfileById(int profileId)
    {
        try
        {
            var profile = await ProfileService.GetProfileById(profileId);
            return Ok(profile);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetProfilesByUserId(int userId)
    {
        try
        {
            var profiles = await ProfileService.GetProfilesByUserId(userId);
            return Ok(profiles);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("profiles")]
    public async Task<ActionResult<IEnumerable<Profile>>> GetProfilesByIds([FromQuery] int?[] ids)
    {
        try
        {
            var profiles = await ProfileService.GetProfilesByIds(ids);
            return Ok(profiles);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
