"use client"

import { useState, useRef } from "react"
import "../styles/ProfileHeader.css"
import edit from '../data/icons8-edit-48.png'
import save from "../data/icons8-done-48.png"

function ProfileHeader({ profilePic, name, description, myRecipesCount, savedRecipesCount, onProfileUpdate, onAddRecipe }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedDescription, setEditedDescription] = useState(description)
    const fileInputRef = useRef(null)

    const handleEditPicture = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                onProfileUpdate({ profilePic: event.target.result })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveDescription = () => {
        onProfileUpdate({ description: editedDescription })
        setIsEditing(false)
    }

    return (
        <div className="profile-header">
            <div className="profile-pic-container">
                <img src={profilePic || "/placeholder.svg"} alt={name} className="profile-pic"/>
                <button className="edit-pic-button" onClick={handleEditPicture}>
                    <img src={edit} alt={name} className="edit-pic"/>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{display: "none"}}
                    accept="image/*"
                />
            </div>

            <h1 className="profile-name">{name}</h1>

            <div className="profile-description-container">
                {isEditing ? (
                    <>
            <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="description-textarea"
            />
                        <button className="save-description-button" onClick={handleSaveDescription}>
                            <img src={save} alt={name} className="edit-pic-save"/>
                        </button>
                    </>
                ) : (
                    <>
                        <p className="profile-description">{description}</p>
                        <button className="edit-description-button" onClick={() => setIsEditing(true)}>
                            <img src={edit} alt={name} className="edit-pic-edit"/>
                        </button>
                    </>
                )}
            </div>

            <div className="recipe-counts-container">
                <div className="recipe-counts">
                    <div className="count-item">
                        <span className="count-number">{myRecipesCount}</span>
                        <span className="count-label">My Recipes</span>
                    </div>
                    <div className="count-item">
                        <span className="count-number">{savedRecipesCount}</span>
                        <span className="count-label">Saved Recipes</span>
                    </div>
                </div>
                <button className="add-recipe-button" onClick={onAddRecipe}>
                    Add Recipe
                </button>
            </div>
        </div>
    )
}

export default ProfileHeader
