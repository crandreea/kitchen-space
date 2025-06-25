using Microsoft.AspNetCore.Mvc;
using RecipeManager.API.Models.DTOs;
using RecipeManager.API.Service;

namespace RecipeManager.API.Controller;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost("register")]
    public async Task<ActionResult<ServiceResponse<string>>> Register(RegisterDTO registerDto)
    {
        var response = await _authService.Register(registerDto);
            
        if (!response.Success)
        {
            return BadRequest(response);
        }
            
        return Ok(response);
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<ServiceResponse<LoginResponseDTO>>> Login(LoginDTO loginDto)
    {
        var response = await _authService.Login(loginDto);
            
        if (!response.Success)
        {
            return Unauthorized(response);
        }
            
        return Ok(response);
    }
}