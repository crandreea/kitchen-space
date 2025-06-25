using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using RecipeManager.API.Models;
using RecipeManager.API.Models.DTOs;
using RecipeManager.API.Service;
using Newtonsoft.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace RecipeManager.API.Controller;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly IRecipeService _service;
    
    public RecipeController(IRecipeService service)
    {
        _service = service;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllRecipesAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); 
        }
        var recipe = await _service.GetRecipeByIdAsync(id);
        return recipe == null ? NotFound() : Ok(recipe);
    }

    [HttpPost]
    [ProducesResponseType(typeof(Recipe), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] Recipe recipe)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var created = await _service.CreateRecipeAsync(recipe);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Recipe), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(int id, [FromBody] Recipe recipe)
    {
        if (id != recipe.Id) 
        {
            return BadRequest("ID mismatch");
        }

        var existingRecipe = await _service.GetRecipeByIdAsync(id);
        if (existingRecipe == null)
        {
            return NotFound($"Recipe with ID {id} not found");
        }
        
        await _service.UpdateRecipeAsync(recipe);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Recipe), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteRecipeAsync(id);
        return NoContent();
    }
    
    [HttpPost("with-image")]
    public async Task<IActionResult> AddRecipeWithImage([FromForm] RecipeDTO dto)
    {
        if (dto.Image == null || dto.Image.Length == 0)
            return BadRequest("Image is required");

        var uploadsFolder = Path.Combine("wwwroot", "images");
        Directory.CreateDirectory(uploadsFolder);
        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Image.FileName);
        var filePath = Path.Combine(uploadsFolder, fileName);
        
        var ingredients = JsonConvert.DeserializeObject<List<Ingredient>>(dto.Ingredients);
        var instructions = JsonConvert.DeserializeObject<List<Instruction>>(dto.Instructions);


        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await dto.Image.CopyToAsync(stream);
        }

        var recipe = new Recipe
        {
            Title = dto.Title,
            PreparationTime = dto.PreparationTime,
            CookingTime = dto.CookingTime,
            Servings = dto.Servings,
            Ingredients = ingredients,
            Instructions = instructions,
            UserId = dto.UserId,
            Image = $"/images/{fileName}"
        };

        var created = await _service.CreateRecipeAsync(recipe);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }
    
    [HttpPut("{id}/with-image")]
    [ProducesResponseType(typeof(Recipe), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateWithImage(int id, [FromForm] RecipeDTO dto)
    {
        try
        {
            if (dto.Id != 0 && dto.Id != id)
            {
                return BadRequest("ID mismatch between route and DTO");
            }

            var existingRecipe = await _service.GetRecipeByIdAsync(id);
            if (existingRecipe == null)
            {
                return NotFound($"Recipe with ID {id} not found");
            }

            if (existingRecipe.UserId != dto.UserId)
            {
                return BadRequest("You don't have permission to update this recipe");
            }

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            
            var ingredientsList = System.Text.Json.JsonSerializer.Deserialize<List<Ingredient>>(dto.Ingredients, options);
            var instructionsList = System.Text.Json.JsonSerializer.Deserialize<List<Instruction>>(dto.Instructions, options);
            
            existingRecipe.Title = dto.Title;
            existingRecipe.PreparationTime = dto.PreparationTime;
            existingRecipe.CookingTime = dto.CookingTime;
            existingRecipe.Servings = dto.Servings;
            existingRecipe.Ingredients = ingredientsList;
            existingRecipe.Instructions = instructionsList;

            if (dto.Image != null && dto.Image.Length > 0)
            {
                var allowedTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/gif" };
                if (!allowedTypes.Contains(dto.Image.ContentType.ToLower()))
                {
                    return BadRequest("Invalid image format. Only JPEG, PNG and GIF are allowed.");
                }
                
                if (dto.Image.Length > 5 * 1024 * 1024)
                {
                    return BadRequest("Image size must be less than 5MB");
                }
                
                var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(dto.Image.FileName)}";
                var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
                
                if (!Directory.Exists(uploadsPath))
                {
                    Directory.CreateDirectory(uploadsPath);
                }

                var filePath = Path.Combine(uploadsPath, fileName);
                
                if (!string.IsNullOrEmpty(existingRecipe.Image))
                {
                    var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", existingRecipe.Image.TrimStart('/'));
                    if (System.IO.File.Exists(oldImagePath))
                    {
                        System.IO.File.Delete(oldImagePath);
                    }
                }
                
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }
                
                existingRecipe.Image = $"/images/{fileName}";
            }
            
            await _service.UpdateRecipeAsync(existingRecipe);

            return Ok(existingRecipe);
        }
        catch (System.Text.Json.JsonException ex)
        {
            return BadRequest($"Invalid JSON format in ingredients or instructions: {ex.Message}");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while updating the recipe: {ex.Message}");
        }
    }
    
    [HttpGet("user/{userId}")] 
    [ProducesResponseType(typeof(IEnumerable<Recipe>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRecipesByUserId(int userId)
    {
        var recipes = await _service.GetRecipesByUserIdAsync(userId);
        if (recipes == null || !recipes.Any())
        {
            return NotFound($"No recipes found for user ID {userId}.");
        }
        return Ok(recipes);
    }
    
    [HttpPost("{recipeId}/save/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)] 
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SaveRecipe(int recipeId, int userId)
    {

        var result = await _service.SaveRecipeForUserAsync(userId, recipeId);
        if (!result)
        {
            return BadRequest("Recipe could not be saved, or it is already saved by this user.");
        }
        return Ok("Recipe saved successfully.");
    }

    [HttpDelete("{recipeId}/unsave/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)] 
    [ProducesResponseType(StatusCodes.Status400BadRequest)] 
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UnsaveRecipe(int recipeId, int userId)
    {
        var result = await _service.UnsaveRecipeForUserAsync(userId, recipeId);
        if (!result)
        {
            return BadRequest("Recipe was not saved by this user, or it could not be unsaved.");
        }
        return Ok("Recipe unsaved successfully.");
    }

    [HttpGet("saved/{userId}")]
    [ProducesResponseType(typeof(IEnumerable<Recipe>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)] 
    public async Task<IActionResult> GetSavedRecipes(int userId)
    {
        var savedRecipes = await _service.GetSavedRecipesByUserIdAsync(userId);
        if (savedRecipes == null || !savedRecipes.Any())
        {
            return NotFound($"No saved recipes found for user ID {userId}.");
        }
        return Ok(savedRecipes);
    }
    
    [HttpGet("{recipeId}/is-saved/{userId}")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    public async Task<IActionResult> IsRecipeSaved(int recipeId, int userId)
    {
        var isSaved = await _service.IsRecipeSavedByUserAsync(userId, recipeId);
        return Ok(isSaved);
    }
}