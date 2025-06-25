using RecipeManager.API.Models;

namespace RecipeManager.API.Data.Repositories;

public interface IRecipeRepository
{
    Task<List<Recipe>> GetAllAsync();
    Task<Recipe?> GetByIdAsync(int id);
    Task<Recipe> AddAsync(Recipe recipe);
    Task UpdateAsync(Recipe recipe);
    Task DeleteAsync(int id);
    Task<IEnumerable<Recipe>> GetRecipesByUserIdAsync(int userId);
    
    Task<bool> SaveRecipeForUserAsync(int userId, int recipeId);
    Task<bool> UnsaveRecipeForUserAsync(int userId, int recipeId);
    Task<IEnumerable<Recipe>> GetSavedRecipesByUserIdAsync(int userId);
    Task<bool> IsRecipeSavedByUserAsync(int userId, int recipeId);
}