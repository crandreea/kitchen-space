using RecipeManager.API.Data.Repositories;
using RecipeManager.API.Models;
using RecipeManager.API.Models.DTOs;

namespace RecipeManager.API.Service;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    public async Task<ServiceResponse<List<UserDTO>>> GetAllUsers()
    {
        var response = new ServiceResponse<List<UserDTO>>();
        var users = await _userRepository.GetAllAsync();
            
        response.Data = users.Select(u => MapToUserDTO(u)).ToList();
        return response;
    }

    public async Task<ServiceResponse<UserDTO>> GetUserById(int id)
    {
        var response = new ServiceResponse<UserDTO>();
        var user = await _userRepository.GetUserByIdAsync(id);
            
        if (user == null)
        {
            response.Success = false;
            response.Message = "User not found";
            return response;
        }
            
        response.Data = MapToUserDTO(user);
        return response;
    }

    public async Task<ServiceResponse<UserDTO>> GetUserByUsername(string username)
    {
        var response = new ServiceResponse<UserDTO>();
        var user = await _userRepository.GetUserByUsernameAsync(username);
            
        if (user == null)
        {
            response.Success = false;
            response.Message = "User not found";
            return response;
        }
            
        response.Data = MapToUserDTO(user);
        return response;
    }
    
    private UserDTO MapToUserDTO(User user)
    {
        return new UserDTO
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Password = null
        };
    }
}