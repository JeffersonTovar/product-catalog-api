using Catalog.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly IJwtService _jwtService;

  public AuthController(IJwtService jwtService)
  {
    _jwtService = jwtService;
  }

  public class LoginRequest
  {
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
  }

  [HttpPost("login")]
  public IActionResult Login([FromBody] LoginRequest request)
  {
    if (request.Username != "admin" || request.Password != "admin")
      return Unauthorized();
    var token = _jwtService.GenerateToken(request.Username);
    return Ok(new { token });
  }
}
