using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipeManager.API.Models.DTOs;
using RecipeManager.API.Service;

namespace RecipeManager.API.Controller;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<UserDTO>>>> GetAllUsers()
    {
        return Ok(await _userService.GetAllUsers());
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<UserDTO>>> GetUserById(int id)
    {
        var response = await _userService.GetUserById(id);
        if (!response.Success)
        {
            return NotFound(response);
        }
        return Ok(response);
    }
    
    [HttpGet("username/{username}")]
    public async Task<ActionResult<ServiceResponse<UserDTO>>> GetUserByUsername(string username)
    {
        var response = await _userService.GetUserByUsername(username);
        if (!response.Success)
        {
            return NotFound(response);
        }
        return Ok(response);
    }
}