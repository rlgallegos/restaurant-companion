

function CompletedOrderItem({itemName, quantity, allergies, notes}) {
    const tailwindCSS = "my-1 ml-auto  text-m flex-grow text-gray-100"
    const tailwindCSS2 = "my-5 ml-auto  text-m flex-grow text-gray-100"


    let uniqueID = 0
    let allergyList = allergies.map(allergy => {
        uniqueID++
        return <li className={tailwindCSS} key={uniqueID}>{allergy['name']}</li>
    })
    return (
        <div className="bg-blue-900 bg-opacity-90 rounded-md shadow-md p-4 md:p-12 my-10">
            <h3 className="text-3xl font-bold text-gray-100 my-auto">{itemName}</h3>
            <p className={tailwindCSS2}>Quantity: {quantity}</p>
            <p className={tailwindCSS2}>Notes: {notes}</p>
            {allergyList}
        </div>
    )
}
export default CompletedOrderItem