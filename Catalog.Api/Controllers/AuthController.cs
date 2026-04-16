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

  [HttpPost("login")]
  public IActionResult Login(string username, string password)
  {
    if (username != "admin" || password != "1234")
      return Unauthorized();
    var token = _jwtService.GenerateToken(username);
    return Ok(new { token });
  }
}
