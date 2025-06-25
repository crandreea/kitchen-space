using RecipeManager.API.Models;

namespace RecipeManager.API.Data.Repositories;
public interface IUserRepository
{
    Task<List<User>> GetAllAsync();
    Task<User> GetUserByUsernameAsync(string email);
    Task<User> GetUserByIdAsync(int id);
    Task<bool> UserExistsAsync(string email);
    Task<User> CreateUserAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(int id);
    Task<bool> EmailExistsAsync(string email);
    Task<bool> UsernameExistsAsync(string username);
}