using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using RecipeManager.API.Data.Repositories;
using RecipeManager.API.Models;
using RecipeManager.API.Models.DTOs;

namespace RecipeManager.API.Service;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(
        IUserRepository userRepository, 
        IConfiguration configuration)
    {
        _userRepository = userRepository ?? 
                          throw new ArgumentNullException(nameof(userRepository));
        _configuration = configuration ?? 
                         throw new ArgumentNullException(nameof(configuration));
    }
    public async Task<ServiceResponse<string>> Register(RegisterDTO registerDto)
    {
        var response = new ServiceResponse<string>();
        
        if (await _userRepository.EmailExistsAsync(registerDto.Email))
        {
            response.Success = false;
            response.Message = "Email already exists";
            return response;
        }
        
        if (await _userRepository.UsernameExistsAsync(registerDto.Username))
        {
            response.Success = false;
            response.Message = "Username already exists";
            return response;
        }
        
        CreatePasswordHash(registerDto.Password, out byte[] passwordHash, out byte[] passwordSalt);
        
        var user = new User
        {
            Username = registerDto.Username,
            Email = registerDto.Email,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            CreatedAt = DateTime.UtcNow,
            EmailConfirmed = false 
        };

        await _userRepository.CreateUserAsync(user);
        
        response.Data = CreateToken(user);
        response.Message = "Registration successful";
        
        return response;
    }

    public async Task<ServiceResponse<LoginResponseDTO>> Login(LoginDTO loginDto)
    {
        var response = new ServiceResponse<LoginResponseDTO>();
        
        var user = await _userRepository.GetUserByUsernameAsync(loginDto.Username);
        
        if (user == null)
        {
            response.Success = false;
            response.Message = "Invalid email or password";
            return response;
        }
        
        if (!VerifyPasswordHash(loginDto.Password, user.PasswordHash, user.PasswordSalt))
        {
            response.Success = false;
            response.Message = "Invalid email or password";
            return response;
        }
        
        response.Data = new LoginResponseDTO
        {
            Token = CreateToken(user),
            UserId = user.Id, 
            Username = user.Username,
            Password = loginDto.Password,
        };
        response.Message = "Login successful";

        return response;
    }
    
    
    private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using (var hmac = new HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }
    }
    
    private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
        using (var hmac = new HMACSHA512(storedSalt))
        {
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != storedHash[i])
                {
                    return false;
                }
            }
            return true;
        }
    }
    
    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email)
        };

        var jwtSecretKey = _configuration.GetSection("AppSettings:Token").Value;

        byte[] keyBytes;
        if (string.IsNullOrEmpty(jwtSecretKey) || Encoding.UTF8.GetBytes(jwtSecretKey).Length < 64)
        {
            using (var hmac = new HMACSHA512())
            {
                keyBytes = hmac.Key;
            }
        }
        else
        {
            keyBytes = Encoding.UTF8.GetBytes(jwtSecretKey);
        
            if (keyBytes.Length < 64)
            {
                var paddedKey = new byte[64];
                Array.Copy(keyBytes, paddedKey, keyBytes.Length);
                keyBytes = paddedKey;
            }
        }

        var key = new SymmetricSecurityKey(keyBytes);

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(30), 
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}