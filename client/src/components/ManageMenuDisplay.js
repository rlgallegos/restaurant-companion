
import ManageMenuCard from "./ManageMenuCard"
import ManageAllergyrBar from "./ManageAllergyBar"
import { useState } from "react"



function ManageMenuDisplay({setRestaurant, restaurant, availableAllergies, setAvailableAllergies}) {
    const tailwindCSSButton2 = "mb-4 ml-4 bg-gray-100 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSButton = "mb-4 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"

    const [displayAllergies, setDisplayAllergies] = useState(false)
    function handleClick() {
        setDisplayAllergies(!displayAllergies)
    }

    //Handle PATCH and DELETE functions
    function handleUpdateItem(updatedItem) {

        const updateIndex = restaurant.menu_items.findIndex(item => item.id == updatedItem.id)

        let newArray = []
        restaurant.menu_items.forEach(menu_item => {
            newArray.push({...menu_item, allergies: [...menu_item.allergies]})
        })
        newArray.splice(updateIndex, 1, updatedItem)
        setRestaurant(restaurant => {
            return {...restaurant, menu_items: restaurant.menu_items = newArray}
        })
    }
    function handleDeleteItem(id) {
        setRestaurant(restaurant => {
            return {...restaurant, menu_items: restaurant.menu_items.filter(item => item.id !== id) }
        })
    }

    let menuItemList = []
    if (restaurant) {
        menuItemList = restaurant.menu_items.map(item => {
            return <ManageMenuCard restaurant={restaurant} setRestaurant={setRestaurant} availableAllergies={availableAllergies} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} key={item.id} menuItem={item} />
        })
    }

    return (
        <>
        <div className="mx-auto">
            <button className={displayAllergies ? tailwindCSSButton : tailwindCSSButton2} onClick={handleClick}>{displayAllergies ? 'Hide Allergy Bar' : 'Add Custom Allergies'}</button>
            {displayAllergies ? <ManageAllergyrBar setAvailableAllergies={setAvailableAllergies} availableAllergies={availableAllergies} /> : null}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center ">
            {restaurant ? menuItemList : <p>Loading...</p>}
        </div>
        </>
    )
}
export default ManageMenuDisplay