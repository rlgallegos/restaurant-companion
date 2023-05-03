
import ManageMenuCard from "./ManageMenuCard"
import ManageAllergyrBar from "./ManageAllergyBar"
import { useState } from "react"



function ManageMenuDisplay({setRestaurant, restaurant, availableAllergies, setAvailableAllergies}) {

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
    // className="flex flex-wrap justify-center max-w-screen-xl mx-auto my-8"

    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center ">
            {restaurant ? menuItemList : <p>Loading...</p>}

        </div>
        <div className="mx-auto">
        <button className="my-1 ml-4 text-m flex-grow bg-blue-900 bg-opacity-90 text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={handleClick}>{displayAllergies ? 'Hide Allergy Bar' : 'Show Allergy Bar'}</button>
            {displayAllergies ? <ManageAllergyrBar setAvailableAllergies={setAvailableAllergies} availableAllergies={availableAllergies} /> : null}
        </div>
        </>
    )
}
export default ManageMenuDisplay