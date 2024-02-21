import _ from 'lodash';

import MenuCard from "./MenuCard"

function MenuCards( {menu, filters} ) {
    let cardList = []

    if (menu) {
        //id's of items to be filtered
        let idArray = []
        filters.forEach(filter => {
            idArray.push(filter.id)
        })
        //filter out the given ids
        let filtered_list = menu.filter(item => {    
            return !item.allergies.some(allergy => {
                return idArray.includes(allergy.id)
            })
        })
        //build the new list to be rendered
        cardList = filtered_list.map(item => {
            return <MenuCard key={item.id} item={item} />
        })
    }

    return (
        <div className="flex flex-wrap justify-center mx-auto my-8">
            {menu ? cardList : null}
        </div>
    )
}

export default MenuCards