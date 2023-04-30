import ManageItemEdit from "./ManageItemEdit"

function ManageMenuCard({menuItem, onUpdateItem, onDeleteItem}) { 

    function handleClick() {

        fetch(`/restaurants/${menuItem.restaurant_id}/items/${menuItem.id}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                onDeleteItem(menuItem.id)
            }
        })
    }

    return (
        <div className="menu-card">
            <h3>{menuItem.name}</h3>
            <p>{menuItem.description}</p>
            <p>This item is {menuItem.kosher ? 'kosher' : 'not kosher'}</p>
            <p>This item is {menuItem.vegan ? 'vegan' : 'not vegan'}</p>

            <ManageItemEdit onUpdateItem={onUpdateItem} menuItem={menuItem} />
            <button onClick={handleClick}>Delete Item</button>
        </div>
    )

}
export default ManageMenuCard