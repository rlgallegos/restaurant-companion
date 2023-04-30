import { useState } from "react"

import ManageRestaurantEditForm from "./ManageRestaurantEditForm"


function ManageRestaurantEdit({restaurant, setRestaurant}) {
    const [isEditing, setIsEditing] = useState(false)
    function handleClick(){
        setIsEditing(!isEditing)
    }
    


    function handleEditRestaurant(updatedRestaurant) {
        console.log('updated rest')
        console.log(updatedRestaurant)
        setRestaurant(updatedRestaurant)
    }
    console.log('orig rest')
    console.log(restaurant)

    return (
        <div>
            <h2>{restaurant.name}</h2>
            <p>Restaurant ID Number: {restaurant.id}</p>
            <p>{restaurant.email}</p>
            <p>{restaurant.url}</p>
            <button onClick={handleClick}>{!isEditing ? "Edit Restaurant Details" : "Close Editor"}</button>
            {isEditing && <ManageRestaurantEditForm restaurantId={restaurant.id} onEditRestaurant={handleEditRestaurant} />}
        </div>
    )
}
export default ManageRestaurantEdit