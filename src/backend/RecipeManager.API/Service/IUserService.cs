using RecipeManager.API.Models.DTOs;

namespace RecipeManager.API.Service;

public interface IUserService
{
    Task<ServiceResponse<List<UserDTO>>> GetAllUsers();
    Task<ServiceResponse<UserDTO>> GetUserById(int id);
    Task<ServiceResponse<UserDTO>> GetUserByUsername(string email);
}