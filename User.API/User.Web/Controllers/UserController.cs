using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Users.Application.Exceptions;
using Users.Application.Interfaces;
using Users.Application.Models;
using Users.Domain.Constants;
using Users.Domain.Entities;

namespace Users.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController(IUserService UserService, ILogger<UserController> Logger) : ControllerBase
    {
        private int RequesterUserId => int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var id) ? id : 0;
        private bool RequesterIsAdmin => User.IsInRole(Roles.Administrator);

        private IActionResult InternalError(Exception ex)
        {
            Logger.LogError(ex, "Unhandled exception in UserController");
            return InternalError(ex);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegDto regDto)
        {
            try
            {
                await UserService.Register(regDto);
                return Ok();
            }
            catch (DuplicateEmailException)
            {
                return BadRequest("Email already exists");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return InternalError(ex);
            }
        }

        [HttpPost("verification")]
        [AllowAnonymous]
        public async Task<IActionResult> Verification([FromBody] VerificationDto verDto)
        {
            try
            {
                var result = await UserService.ConfirmEmail(verDto.Email, verDto.Code);
                return Ok(result);
            }
            catch (InvalidConfirmationCodeException)
            {
                return BadRequest("Invalid confirmation code");
            }
            catch (Exception ex)
            {
                return InternalError(ex);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var result = await UserService.Login(loginDto);
                return Ok(result);
            }
            catch (AuthorizationException)
            {
                return Unauthorized("Invalid email or password.");
            }
            catch (Exception ex)
            {
                return InternalError(ex);
            }
        }

        [HttpPost("refresh")]
        [AllowAnonymous]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto refreshDto)
        {
            try
            {
                var result = await UserService.RefreshTokenAsync(refreshDto.RefreshToken);
                return Ok(result);
            }
            catch (AuthorizationException)
            {
                return Unauthorized("Invalid or expired refresh token.");
            }
            catch (Exception ex)
            {
                return InternalError(ex);
            }
        }

        /// <summary>Current authenticated user's identity (id, email, role).</summary>
        [HttpGet("me")]
        public IActionResult Me()
        {
            return Ok(new
            {
                userId = RequesterUserId,
                email = User.FindFirst(ClaimTypes.Name)?.Value,
                role = User.FindFirst(ClaimTypes.Role)?.Value ?? Roles.User
            });
        }

        [HttpGet("all")]
        [Authorize(Roles = Roles.Administrator)]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                return Ok(await UserService.GetAllUsers());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{userId}/reset-password")]
        [Authorize(Roles = Roles.Administrator)]
        public async Task<IActionResult> ResetPassword(int userId, [FromBody] ResetPasswordDto dto)
        {
            try
            {
                var password = await UserService.ResetPasswordAsync(userId, dto.NewPassword);
                return Ok(new { password });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return InternalError(ex);
            }
        }

        [HttpPut("{userId}/role")]
        [Authorize(Roles = Roles.Administrator)]
        public async Task<IActionResult> SetRole(int userId, [FromBody] SetRoleDto dto)
        {
            try
            {
                await UserService.SetUserRoleAsync(userId, dto.Role, RequesterUserId);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return InternalError(ex);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser([FromQuery] int userId, [FromBody] UpdateUserDto updateUserDto)
        {
            try
            {
                var result = await UserService.UpdateUser(
                    userId, updateUserDto.PhoneNumber, updateUserDto.Password, RequesterUserId, RequesterIsAdmin);
                return Ok(result);
            }
            catch (AuthorizationException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                return InternalError(ex);
            }
        }

        [HttpDelete("delete/{userId}")]
        [Authorize(Roles = Roles.Administrator)]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            try
            {
                var result = await UserService.DeleteUser(userId, RequesterUserId, RequesterIsAdmin);
                return Ok(result);
            }
            catch (AuthorizationException)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                return InternalError(ex);
            }
        }
    }
}
