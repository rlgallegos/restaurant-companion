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
        <>
            <div className="bg-blue-900 bg-opacity-90 rounded-md shadow-md flex-grow-0 p-12 w-4/5 sm:w-1/2 mx-auto md:mx-12 my-10 flex flex-col">
              
                <h1 className="text-2xl font-bold  text-gray-100 my-3" >{menuItem.name}</h1>
                <p className="my-3 ml-4  text-m  text-gray-100">{menuItem.description}</p>
                <p className="my-1 ml-4  text-m  text-gray-100">This item is {menuItem.kosher ? 'kosher' : 'not kosher'}</p>
                <p className="my-1 ml-4  text-m  text-gray-100">This item is {menuItem.vegan ? 'vegan' : 'not vegan'}</p>
                <button className="my-1 ml-4 text-m text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={handleClick}>Delete Item</button>
                <button className="my-1 ml-4 text-m text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={handleExpandAllergyMenu}>{isAddingAllergies ? "Close Allergy Menu" : "Expand Allergy Menu"}</button>
                <ManageItemEdit onUpdateItem={onUpdateItem} menuItem={menuItem} />
            </div>
            <div className="relative">
            {isAddingAllergies && 
                <ManageAddedItem 
                newItem={menuItem} 
                availableAllergies={availableAllergies} 
                restaurant={restaurant} 
                setRestaurant={setRestaurant} /> }
            </div>
        </>
    )

}
export default ManageMenuCard