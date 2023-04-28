import ManageItemEdit from "./ManageItemEdit"

function ManageMenuCard({menuItem}) {

    // let allergyList = []
    // let uniqueId = 0
    // if (menuItem) {
    //     allergyList = menuItem.allergies.map(allergy => {
    //         uniqueId++
    //         return <li key={uniqueId}>{allergy.name}{allergy.removable ? '- Removable' : '- Not Removable'}</li>
    //     })
    // }


    return (
        <div className="menu-card">
            <h3>{menuItem.name}</h3>
            <p>{menuItem.description}</p>
            <p>This item is {menuItem.kosher ? 'kosher' : 'not kosher'}</p>
            <p>This item is {menuItem.vegan ? 'vegan' : 'not vegan'}</p>
            <h4>Allergies:</h4>
            <ul>
                {/* {menuItem && allergyList} */}
            </ul>
            <ManageItemEdit menuItem={menuItem} />
        </div>
    )

}
export default ManageMenuCard