import { useEffect, useState } from 'react';

function OrderDetailCard({order, onDeleteAllergy}) {
    const [allergyObjectList, setAllergyObjectList] = useState(order.item.allergies)

    const tailwindCSS = "my-1 ml-auto  text-m flex-grow text-gray-100"
    const tailwindCSS2 = "my-5 ml-auto  text-m flex-grow text-gray-100"

    //Build Lists
    let uniqueID = 0
    let filterList = order.filters.map(filter => {
        uniqueID++
        return <li className={tailwindCSS} key={uniqueID}>{filter.name}</li>
    })

    let uniqueID2 = 0
    let allergyList = allergyObjectList.map(allergy => {
        uniqueID2++
        return <li  key={uniqueID2} className={tailwindCSS}>{allergy.name}</li>
    })


    return(
        <div className="bg-blue-900 bg-opacity-90 rounded-md shadow-md w-auto sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-8 mx-10 my-10 ">
            <br></br>
            <h1 className="text-3xl font-bold flex-grow text-gray-100 my-auto">{order.item.name}</h1>
            <p className={tailwindCSS2}>{order.item.description}</p>
            <p className={tailwindCSS2}>Quantity: {order.quantity}</p>
            <h3 className={tailwindCSS2}>Allergies That Usually Come With This Dish:</h3>
            <ul className="ml-6 text-center mx-auto ">
                {allergyList}
            </ul>
            <h3 className={tailwindCSS2}>Allergies To Be Removed For This Dish:</h3>
            <ul className="ml-6 text-center">
                {filterList ? filterList : <p>None</p>}
            </ul>
        </div>
    )
}

export default OrderDetailCard