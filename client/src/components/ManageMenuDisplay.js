

import ManageMenuCard from "./ManageMenuCard"


function ManageMenuDisplay({setRestaurant, restaurant}) {

    //Handle PATCH and DELETE functions
    function handleUpdateItem(updatedItem) {
        const updateIndex = restaurant.menu_items.findIndex(item => item.id == updatedItem.id)
        let newArray = [...restaurant.menu_items]
        newArray.splice(updateIndex, 1, updatedItem)
        setRestaurant(restaurant => {
            return {...restaurant, menu_items: restaurant.menu_items = newArray}
        })
    }
    function handleDeleteItem(id) {
        console.log('deleting item')
        console.log(id)
        setRestaurant(restaurant => {
            return {...restaurant, menu_items: restaurant.menu_items.filter(item => item.id !== id) }
        })
    }

    console.log('This is restaurant')
    console.log(restaurant)
    let menuItemList = []
    if (restaurant) {
        menuItemList = restaurant.menu_items.map(item => {
            return <ManageMenuCard onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} key={item.id} menuItem={item} />
        })
    }

    return (
        <div>
            {restaurant ? menuItemList : <p>Loading...</p>}
        </div>
    )
}
export default ManageMenuDisplay