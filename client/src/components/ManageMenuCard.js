import { useState } from "react"
import ManageItemEdit from "./ManageItemEdit"
import ManageMenuAddAllergy from "./ManageMenuAddAllergy"
import ManageAddedItem from "./ManageAddedItem"

function ManageMenuCard({menuItem, onUpdateItem, onDeleteItem, availableAllergies, restaurant, setRestaurant}) { 
    const [isAddingAllergies, setIsAddingAllergies] = useState(false)

    //Delete Entire MenuItem
    function handleClick() {
        fetch(`/restaurants/${menuItem.restaurant_id}/items/${menuItem.id}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                onDeleteItem(menuItem.id)
            }
        })
    }

    function handleExpandAllergyMenu() {
        setIsAddingAllergies(!isAddingAllergies)
    }

    return (
        <div className="menu-card">
            <h3>{menuItem.name}</h3>
            <p>{menuItem.description}</p>
            <p>This item is {menuItem.kosher ? 'kosher' : 'not kosher'}</p>
            <p>This item is {menuItem.vegan ? 'vegan' : 'not vegan'}</p>
            <ManageItemEdit onUpdateItem={onUpdateItem} menuItem={menuItem} />
            <button onClick={handleClick}>Delete Item</button>
            <button onClick={handleExpandAllergyMenu}>{isAddingAllergies ? "Close allergy menu" : "Show allergy menu"}</button>
            {/* {isAddingAllergies && <ManageMenuAddAllergy menuItem={menuItem} availableAllergies={availableAllergies} /> } */}
            {isAddingAllergies && 
            <ManageAddedItem 
            newItem={menuItem} 
            availableAllergies={availableAllergies} 
            restaurant={restaurant} 
            setRestaurant={setRestaurant} /> }
        </div>
    )

}
export default ManageMenuCard