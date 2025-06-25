using RecipeManager.API.Models.DTOs;

namespace RecipeManager.API.Service;

public interface IAuthService
{
    Task<ServiceResponse<string>> Register(RegisterDTO registerDto);
    Task<ServiceResponse<LoginResponseDTO>> Login(LoginDTO loginDto);
}