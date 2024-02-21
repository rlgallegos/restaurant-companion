import { useState } from 'react';

function OrderDetailCard({ order }) {
    const [allergyObjectList, setAllergyObjectList] = useState(order.item.allergies)

    const tailwindCSSCard = "bg-gray-100 bg-opacity-80 rounded-md shadow-md sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col border border-transparent "
    const tailwindCSSTitle = "text-3xl font-bold flex-grow text-gray-700 my-auto"
    const tailwindCSSSP = "my-1 md:my-2 ml-4 text-m flex-grow text-gray-600"
    const tailwindCSSSListItem = "my-1 ml-4 text-m flex-grow text-gray-600 text-center"

    //Build Lists
    let uniqueID = 0
    let filterList = order.filters.map(filter => {
        uniqueID++
        return <li className={tailwindCSSSListItem} key={uniqueID}>{filter.name}</li>
    })

    let uniqueID2 = 0
    let allergyList = allergyObjectList.map(allergy => {
        uniqueID2++
        return <li  key={uniqueID2} className={tailwindCSSSListItem}>{allergy.name}</li>
    })



    return(
        <div className={tailwindCSSCard}>
            <br></br>
            <h1 className={tailwindCSSTitle}>{order.item.name}</h1>
            <p className={tailwindCSSSP}>{order.item.description}</p>
            <p className={tailwindCSSSP}>Quantity: {order.quantity}</p>
            <h3 className={tailwindCSSSP}>Allergies That Usually Come With This Dish:</h3>
            <ul className="mx-auto">
                {!allergyList ? allergyList : <p className={tailwindCSSSP}>None</p>}
            </ul>
            <h3 className={tailwindCSSSP}>Allergies To Be Removed For This Dish:</h3>
            <ul className="mx-auto">
                {!filterList ? filterList : <p className={tailwindCSSSP}>None</p>}
            </ul>
        </div>
    )
}

export default OrderDetailCard