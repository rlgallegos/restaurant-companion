

function CompletedOrderItem({itemName, quantity, allergies, notes}) {
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "my-4 md:my-2 ml-4 text-m flex-grow text-gray-600 text-left"
    const tailwindCSSSListItem = "my-2 text-m flex-grow text-gray-600 text-center"


    let uniqueID = 0
    let allergyList = allergies.map(allergy => {
        uniqueID++
        return <li className={tailwindCSSSListItem} key={uniqueID}>{allergy['name']}</li>
    })
    return (
        <div className={"bg-gray-100 bg-opacity-80 rounded-md shadow-md p-4 md:p-12 my-10 w-full"}>
            <h3 className={tailwindCSSSubTitle}>{itemName}</h3>
            <p className={tailwindCSSSP}>Quantity: {quantity}</p>
            <p className={tailwindCSSSP}>Notes: {notes}</p>
            <p className={tailwindCSSSP}>Allergies to be removed from the dish:</p>
            {allergyList}
        </div>
    )
}
export default CompletedOrderItem