import MenuCard from "./MenuCard"

function MenuCards( {items} ) {
    const cardList = items.map(item => {
        return <MenuCard key={item.id} item={item} />
    })


    return (
        <div>
            {cardList}
        </div>
    )
}

export default MenuCards