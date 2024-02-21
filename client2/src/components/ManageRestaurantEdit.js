import { useState } from "react"
import { useNavigate } from 'react-router-dom';

import ManageRestaurantEditForm from "./ManageRestaurantEditForm"

const BACKEND_URL = process.env.REACT_APP_API_URL

function ManageRestaurantEdit({restaurant, setRestaurant}) {

    const tailwindCSSCard = "bg-gray-100 bg-opacity-80 rounded-md shadow-md w-5/6 md:w-1/2 p-12 my-10 flex flex-col border border-transparent mx-auto"
    const tailwindCSSButton = "my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 w-4/5 md:w-1/3 mx-auto py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "ml-2 my-4 md:my-2 text-m flex-grow text-gray-600 text-center"

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState()

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
        fetch(`${BACKEND_URL}/restaurants`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(restaurant.id)
        }).then(res => {
            if (res.ok) {
                navigate('/')
            } else {
                res.json().then(e => setErrorMessage(e.error))
                setShowDeleteMenu(false)
            }
        })
    }

    return (
        <div className={tailwindCSSCard}>
            <h2 className={tailwindCSSSubTitle}>{restaurant.name}</h2>
            <p className={tailwindCSSSP}>Restaurant ID Number: {restaurant.id}</p>
            <p className={tailwindCSSSP}>{restaurant.email}</p>
            <p className={tailwindCSSSP}>{restaurant.url}</p>
            <button className={tailwindCSSButton} onClick={handleClick}>{!isEditing ? "Edit Restaurant Details" : "Close Editor"}</button>
            {isEditing && <ManageRestaurantEditForm restaurantId={restaurant.id} onEditRestaurant={handleEditRestaurant} />}
            <button className={tailwindCSSButton} onClick={handleShowDeleteConfirmation}>Delete Restaurant</button>
            {errorMessage && <div>
            <p className="my-3" style={{color: "red"}}>{errorMessage}</p></div>}
            {showDeleteMenu && <div>
                <h3 className={tailwindCSSSubTitle}>Are you sure?</h3>
                <p className={tailwindCSSSP}>(This action is irreversable)</p>
                <button className={tailwindCSSButton} onClick={handleDeleteRestaurant}>Permanently Delete Restaurant Account</button>
                <br></br>
                <button className={tailwindCSSButton} onClick={handleCancel}>Cancel</button>
            </div>}
        </div>
    )
}
export default ManageRestaurantEdit