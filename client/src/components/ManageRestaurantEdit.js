import { useState } from "react"
import { useNavigate } from 'react-router-dom';

import ManageRestaurantEditForm from "./ManageRestaurantEditForm"


function ManageRestaurantEdit({restaurant, setRestaurant}) {
    const navigate = useNavigate()

    //State and its functions
    const [isEditing, setIsEditing] = useState(false)
    const [showDeleteMenu, setShowDeleteMenu] = useState(false)
    function handleClick(){
        setIsEditing(!isEditing)
    }
    function handleShowDeleteConfirmation() {
        setShowDeleteMenu(true)
    }
    function handleCancel() {
        setShowDeleteMenu(false)
    }
    function handleEditRestaurant(updatedRestaurant) {
        setRestaurant(updatedRestaurant)
    }

    //Delete Restaurant fetch
    function handleDeleteRestaurant() {
        fetch('/restaurants', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurant.id)
        }).then(res => {
            if (res.ok) {
                console.log('okay')
                navigate('/')
            }
        })
    }



    return (
        <div>
            <h2>{restaurant.name}</h2>
            <p>Restaurant ID Number: {restaurant.id}</p>
            <p>{restaurant.email}</p>
            <p>{restaurant.url}</p>
            <button onClick={handleClick}>{!isEditing ? "Edit Restaurant Details" : "Close Editor"}</button>
            {isEditing && <ManageRestaurantEditForm restaurantId={restaurant.id} onEditRestaurant={handleEditRestaurant} />}
            <button onClick={handleShowDeleteConfirmation}>Delete Restaurant</button>
            {showDeleteMenu && <div>
                <h3>Are you sure?</h3>
                <p>(This action is irreversable)</p>
                <button onClick={handleDeleteRestaurant}>Permanently Delete Restaurant Account</button>
                <br /><br /><br />
                <button onClick={handleCancel}>Cancel</button>
            </div>}
        </div>
    )
}
export default ManageRestaurantEdit