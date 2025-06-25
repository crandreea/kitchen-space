"use client"

import "../styles/RecipeModal.css"

function RecipeModal({ recipe, onClose }) {
    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={`full-${i}`} className="star full">
          ★
        </span>,
            )
        }

        if (hasHalfStar) {
            stars.push(
                <span key="half" className="star half">
          ★
        </span>,
            )
        }

        const emptyStars = 5 - stars.length
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className="star empty">
          ☆
        </span>,
            )
        }

        return stars
    }

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/placeholder-recipe.jpg'
        if (imagePath.startsWith('/')) {
            return `http://localhost:5122${imagePath}`
        }
        return imagePath
    }
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    ×
                </button>

                <div className="modal-header">
                    <img
                        src={getImageUrl(recipe.image)}
                        alt={recipe.title}
                        className="modal-image"
                        onError={(e) => {
                            e.target.src = '/placeholder-recipe.jpg'
                        }}
                    />
                    <div className="modal-title-container">
                        <h2 className="modal-title">{recipe.title}</h2>
                        <div className="recipe-rating">
                            <div className="stars">{renderStars(recipe.stars)}</div>
                            <span className="reviews">({recipe.reviews} reviews)</span>
                        </div>
                    </div>
                </div>

                <div className="recipe-meta">
                    <div className="meta-item">
                        <span className="meta-label">Prep Time:</span>
                        <span className="meta-value">{recipe.preparationTime}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Cook Time:</span>
                        <span className="meta-value">{recipe.cookingTime}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Servings:</span>
                        <span className="meta-value">{recipe.servings}</span>
                    </div>
                </div>

                <div className="recipe-section">
                    <h3>Ingredients</h3>
                    <ul className="ingredients-list">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="recipe-section">
                    <h3>Instructions</h3>
                    <ol className="steps-list">
                        {recipe.instructions.map((step, index) => (
                            <li key={index}>{step.step}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default RecipeModal
