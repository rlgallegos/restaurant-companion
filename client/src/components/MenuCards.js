import MenuCard from "./MenuCard"
// import { useEffect } from 'react';


function MenuCards( {menu, filters} ) {

    let cardList = []
    if (menu) {
        let filtered_list = menu.filter(item => {
            return !item.ingredients.some(ingredient => {
                return filters.includes(ingredient.name)
            })
        })
        cardList = filtered_list.map(item => {
            return <MenuCard key={item.id} item={item} />
        })
    }

    return (
        <div className="menu-display">
            {menu ? cardList : null}
        </div>
    )
}

export default MenuCards