

import { useEffect } from "react"
import ManageMenuCard from "./ManageMenuCard"


function ManageMenuDisplay({restaurant}) {

    let menuItemList = []
    // let uniqueId = 0
    if (restaurant) {
        // uniqueId++
        menuItemList = restaurant.menu_items.map(item => {
            return <ManageMenuCard key={item.id} menuItem={item} />
        })
    }

    return (
        <div>
            {restaurant ? menuItemList : <p>Loading...</p>}
        </div>
    )
}
export default ManageMenuDisplay