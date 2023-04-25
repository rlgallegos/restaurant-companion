

function CompletedOrderItem({itemName, quantity, allergies, notes}) {
    let uniqueID = 0
    let allergyList = allergies.map(allergy => {
        uniqueID++
        return <p key={uniqueID}>{allergy['name']}</p>
    })
    return (
        <div className="menu-card">
            <h3>{itemName}</h3>
            <p>{quantity}</p>
            <p>{notes}</p>
            {allergyList}
        </div>
    )
}
export default CompletedOrderItem