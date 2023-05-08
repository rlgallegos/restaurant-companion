import { useState } from "react"
import ManageItemEdit from "./ManageItemEdit"
import ManageMenuAddAllergy from "./ManageMenuAddAllergy"
import ManageAddedItem from "./ManageAddedItem"

function ManageMenuCard({menuItem, onUpdateItem, onDeleteItem, availableAllergies, restaurant, setRestaurant}) { 
    const tailwindCSS = " mr-2 mb-2 md:ml-4 text-lg text-gray-100 "
    const tailwindCSS2 = "text-sm pl-2 h-8  text-gray-900 text-gray-100 text-gray-100 my-2 w-full sm:w-3/4"
    const tailwindCSSCard = "bg-gray-100 bg-opacity-80 rounded-md shadow-md sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col border border-transparent "
    const tailwindCSSTitle = "flex-grow-0 text-3xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "flex-grow-0 ml-2 my-4 md:my-2 text-m flex-grow text-gray-600 text-center"
    const tailwindCSSButton = "flex-grow-0 my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSButton2 = "my-1 ml-4 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"
    const tailwindCSSSListItem = "my-2 text-m flex-grow text-gray-600 text-center"



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
            <div className={"bg-gray-100 bg-opacity-80 rounded-md shadow-md flex-grow-0 p-12 w-5/6 sm:w-2/3 mx-auto md:mx-6 my-10 flex flex-col"}>
                <h1 className={tailwindCSSTitle} >{menuItem.name}</h1>
                <p className={tailwindCSSSP}>{menuItem.description}</p>
                <p className={tailwindCSSSP}>This item is {menuItem.kosher ? 'kosher' : 'not kosher'}</p>
                <p className={tailwindCSSSP}>This item is {menuItem.vegan ? 'vegan' : 'not vegan'}</p>
                <button className={tailwindCSSButton} onClick={handleClick}>Delete Item</button>
                <button className={tailwindCSSButton} onClick={handleExpandAllergyMenu}>{isAddingAllergies ? "Close Allergy Menu" : "Expand Allergy Menu"}</button>
                <ManageItemEdit onUpdateItem={onUpdateItem} menuItem={menuItem} />
            </div>
            <div className="w-5/6 sm:w-2/3">
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