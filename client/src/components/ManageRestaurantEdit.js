import { useState } from "react"
import { useNavigate } from 'react-router-dom';

import ManageRestaurantEditForm from "./ManageRestaurantEditForm"


function ManageRestaurantEdit({restaurant, setRestaurant}) {
    const tailwindCSS = " mr-2 mb-2 md:ml-4 text-lg text-gray-100 "
    const tailwindCSS2 = "text-sm pl-2 h-8  text-gray-900 text-gray-100 text-gray-100 my-2"

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
        <div className="bg-blue-900 bg-opacity-90 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col card">
            <h2 className="text-3xl text-gray-100">{restaurant.name}</h2>
            <p className={tailwindCSS}>Restaurant ID Number: {restaurant.id}</p>
            <p className={tailwindCSS}>{restaurant.email}</p>
            <p className={tailwindCSS}>{restaurant.url}</p>
            <button className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={handleClick}>{!isEditing ? "Edit Restaurant Details" : "Close Editor"}</button>
            {isEditing && <ManageRestaurantEditForm restaurantId={restaurant.id} onEditRestaurant={handleEditRestaurant} />}
            <button className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={handleShowDeleteConfirmation}>Delete Restaurant</button>
            {showDeleteMenu && <div>
                <h3 className={tailwindCSS}>Are you sure?</h3>
                <p className={tailwindCSS}>(This action is irreversable)</p>
                <button className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={handleDeleteRestaurant}>Permanently Delete Restaurant Account</button>
                <button className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={handleCancel}>Cancel</button>
            </div>}
        </div>
    )
}
export default ManageRestaurantEdit