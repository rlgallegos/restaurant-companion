
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

    return (
        <div>
            {restaurant ? menuItemList : <p>Loading...</p>}
            {displayAllergies ? <ManageAllergyrBar setAvailableAllergies={setAvailableAllergies} availableAllergies={availableAllergies} /> : null}
            <button onClick={handleClick}>{displayAllergies ? 'Hide Allergy Bar' : 'Show Allergy Bar'}</button>
            <br /><br />
        </div>
    )
}
export default ManageMenuDisplay