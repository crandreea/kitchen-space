"use client"

import { useState } from "react"
import "../styles/RecipeForm.css"
function RecipeForm({ recipe, onSave, onClose }) {
    const [formData, setFormData] = useState(() => {
        if (recipe) {
            return {
                name: recipe.title,
                imagePreview: recipe.image ? `http://localhost:5122${recipe.image}` : null, 
                imageFile: null, 
                ingredients: recipe.ingredients?.map(i => i.name) || [""],
                steps: recipe.instructions?.map(s => s.step) || recipe.steps?.map(s => s.step) || [""],
                prepTime: recipe.preparationTime || recipe.prepTime || "",
                cookTime: recipe.cookingTime || recipe.cookTime || "",
                servings: recipe.servings || "",
                userId: recipe.userId || "",
                hasNewImage: false
            }
        }
        return {
            name: "",
            imagePreview: null, 
            imageFile: null, 
            ingredients: [""],
            steps: [""],
            prepTime: "",
            cookTime: "",
            servings: "",
            userId: "",
            hasNewImage: false
        }
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...formData.ingredients]
        updatedIngredients[index] = value
        setFormData({ ...formData, ingredients: updatedIngredients })
    }

    const handleStepChange = (index, value) => {
        const updatedSteps = [...formData.steps]
        updatedSteps[index] = value
        setFormData({ ...formData, steps: updatedSteps })
    }

    const addIngredient = () => {
        setFormData({ ...formData, ingredients: [...formData.ingredients, ""] })
    }

    const removeIngredient = (index) => {
        const updatedIngredients = formData.ingredients.filter((_, i) => i !== index)
        setFormData({ ...formData, ingredients: updatedIngredients })
    }

    const addStep = () => {
        setFormData({ ...formData, steps: [...formData.steps, ""] })
    }

    const removeStep = (index) => {
        const updatedSteps = formData.steps.filter((_, i) => i !== index)
        setFormData({ ...formData, steps: updatedSteps })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({
                ...prev,
                imageFile: file,
                hasNewImage: true
            }))
            const reader = new FileReader()
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    imagePreview: event.target.result
                }))
            }
            reader.readAsDataURL(file)
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const cleanedData = {
            ...formData,
            ingredients: formData.ingredients.filter((item) => item.trim() !== ""),
            steps: formData.steps.filter((item) => item.trim() !== ""),
        }
        onSave(cleanedData)
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="recipe-form-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    ×
                </button>
                <h2 className="form-title">{recipe ? "Edit Recipe" : "Add New Recipe"}</h2>

                <form onSubmit={handleSubmit} className="recipe-form">
                    <div className="form-group">
                        <label htmlFor="name">Recipe Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter recipe name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Recipe Image</label>
                        <div className="image-upload-container">
                            {formData.imagePreview && (
                                <div className="image-preview-container">
                                    <img
                                        src={formData.imagePreview}
                                        alt="Recipe preview"
                                        className="image-preview"
                                    />
                                    {recipe && !formData.hasNewImage && (
                                        <p className="image-status">Current image</p>
                                    )}
                                    {formData.hasNewImage && (
                                        <p className="image-status">New image selected</p>
                                    )}
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="image-upload"
                                //required={false}
                                required={!recipe}
                            />
                            {recipe && (
                                <p className="image-help-text">
                                    Leave empty to keep current image, or select a new one to replace it
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="prepTime">Prep Time</label>
                            <input
                                type="text"
                                id="prepTime"
                                name="prepTime"
                                value={formData.prepTime}
                                onChange={handleChange}
                                placeholder="e.g. 15 min"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cookTime">Cook Time</label>
                            <input
                                type="text"
                                id="cookTime"
                                name="cookTime"
                                value={formData.cookTime}
                                onChange={handleChange}
                                placeholder="e.g. 30 min"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="servings">Servings</label>
                            <input
                                type="number"
                                id="servings"
                                name="servings"
                                value={formData.servings}
                                onChange={handleChange}
                                placeholder="e.g. 4"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Ingredients</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="list-item-container">
                                <input
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    placeholder="Enter ingredient"
                                />
                                <button
                                    type="button"
                                    className="remove-button"
                                    onClick={() => removeIngredient(index)}
                                    disabled={formData.ingredients.length <= 1}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button type="button" className="add-button" onClick={addIngredient}>
                            Add Ingredient
                        </button>
                    </div>

                    <div className="form-group">
                        <label>Steps</label>
                        {formData.steps.map((step, index) => (
                            <div key={index} className="list-item-container">
                <textarea
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                />
                                <button
                                    type="button"
                                    className="remove-button"
                                    onClick={() => removeStep(index)}
                                    disabled={formData.steps.length <= 1}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button type="button" className="add-button" onClick={addStep}>
                            Add Step
                        </button>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="save-button">
                            Save Recipe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RecipeForm
