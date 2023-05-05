

function CompletedOrderItem({itemName, quantity, allergies, notes}) {
    const tailwindCSSCard = "bg-gray-100 bg-opacity-80 rounded-md shadow-md sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col border border-transparent "
    const tailwindCSSTitle = "text-3xl font-bold flex-grow text-gray-700 my-auto"
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "my-4 md:my-2 ml-4 text-m flex-grow text-gray-600 text-left"
    const tailwindCSSButton = "my-1 ml-4 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSButton2 = "my-1 ml-4 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSInput = "text-sm pl-2 h-8  text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center"
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