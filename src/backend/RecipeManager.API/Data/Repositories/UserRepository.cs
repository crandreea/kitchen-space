using Microsoft.EntityFrameworkCore;
using RecipeManager.API.Models;

namespace RecipeManager.API.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;
    
    public UserRepository(ApplicationDbContext context)
    {
        this._context = context;
    }
    
    public async Task<List<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }
    
    public async Task<User> GetUserByUsernameAsync(string email)
    {
        return await _context.Users.SingleOrDefaultAsync(u => u.Username.ToLower() == email.ToLower());
    }
    
    public async Task<User> GetByUsernameAsync(string username)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
    }
    
    public async Task<User> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }
    
    public async Task<bool> UserExistsAsync(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email == email);
    }
    
    public async Task<User> CreateUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }
    
    public async Task UpdateAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var user = await GetUserByIdAsync(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public async Task<bool> UsernameExistsAsync(string username)
    {
        return await _context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower());
    }
}