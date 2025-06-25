using Microsoft.EntityFrameworkCore;
using RecipeManager.API.Models;

namespace RecipeManager.API.Data.Repositories;


public class RecipeRepository : IRecipeRepository
{
    private readonly ApplicationDbContext _context;

    public RecipeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    
    public async Task<List<Recipe>> GetAllAsync() =>
        await _context.Recipes
            .Include(r => r.Ingredients) 
            .Include(r => r.Instructions).ToListAsync();

    public async Task<Recipe?> GetByIdAsync(int id) =>
        await _context.Recipes
            .Include(r => r.Ingredients) 
            .Include(r => r.Instructions).FirstOrDefaultAsync(r => r.Id == id);

    public async Task<Recipe> AddAsync(Recipe recipe)
    {
        _context.Recipes.Add(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }

    public async Task UpdateAsync(Recipe recipe)
    {
        var existingRecipe = await _context.Recipes
            .Include(r => r.Ingredients) 
            .Include(r => r.Instructions)
            .FirstOrDefaultAsync(r => r.Id == recipe.Id);

        if (existingRecipe == null)
        {
            throw new KeyNotFoundException($"Recipe with ID {recipe.Id} not found.");
        }

        existingRecipe.Title = recipe.Title;
        existingRecipe.PreparationTime = recipe.PreparationTime;
        existingRecipe.CookingTime = recipe.CookingTime;
        existingRecipe.Servings = recipe.Servings;
        existingRecipe.UserId = recipe.UserId;
        existingRecipe.Image = recipe.Image; 

        _context.Ingredients.RemoveRange(existingRecipe.Ingredients);
        _context.Instructions.RemoveRange(existingRecipe.Instructions);

        existingRecipe.Ingredients = recipe.Ingredients.Select(i => new Ingredient { Name = i.Name }).ToList();
        existingRecipe.Instructions = recipe.Instructions.Select(i => new Instruction { Step = i.Step }).ToList();
    
        await _context.SaveChangesAsync();
        
    }

    public async Task DeleteAsync(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);
        if (recipe != null)
        {
            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
        }
    }
    
    public async Task<IEnumerable<Recipe>> GetRecipesByUserIdAsync(int userId)
    {
        return await _context.Recipes
            .Where(r => r.UserId == userId)
            .Include(r => r.Ingredients) 
            .Include(r => r.Instructions)
            .ToListAsync();
    }
    
    public async Task<bool> SaveRecipeForUserAsync(int userId, int recipeId)
    {
        var recipeExists = await _context.Recipes.AnyAsync(r => r.Id == recipeId);
        var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
        if (!recipeExists || !userExists)
        {
            return false; 
        }

        var existingSave = await _context.UserSavedRecipes
                                         .FirstOrDefaultAsync(usr => usr.UserId == userId && usr.RecipeId == recipeId);

        if (existingSave != null)
        {
            return false; // Deja salvată
        }

        var userSavedRecipe = new UserSavedRecipe { UserId = userId, RecipeId = recipeId };
        _context.UserSavedRecipes.Add(userSavedRecipe);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UnsaveRecipeForUserAsync(int userId, int recipeId)
    {
        var userSavedRecipe = await _context.UserSavedRecipes
                                            .FirstOrDefaultAsync(usr => usr.UserId == userId && usr.RecipeId == recipeId);

        if (userSavedRecipe == null)
        {
            return false;
        }

        _context.UserSavedRecipes.Remove(userSavedRecipe);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Recipe>> GetSavedRecipesByUserIdAsync(int userId)
    {
        return await _context.UserSavedRecipes
            .Where(usr => usr.UserId == userId)
            .Include(usr => usr.Recipe) 
            .ThenInclude(r => r.Ingredients) 
            .Include(usr => usr.Recipe)
            .ThenInclude(r => r.Instructions)
            .Select(usr => usr.Recipe)
            .ToListAsync();
    }


    public async Task<bool> IsRecipeSavedByUserAsync(int userId, int recipeId)
    {
        return await _context.UserSavedRecipes.AnyAsync(usr => usr.UserId == userId && usr.RecipeId == recipeId);
    }
}
