import { useEffect, useState } from 'react';

function OrderDetailCard({order, onDeleteAllergy}) {
    const [allergyObjectList, setAllergyObjectList] = useState(order.item.allergies)

    //Build Lists
    let uniqueID = 0
    let filterList = order.filters.map(filter => {
        uniqueID++
        return <p key={uniqueID}>{filter.name}</p>
    })

    let uniqueID2 = 0
    let allergyList = allergyObjectList.map(allergy => {
        uniqueID2++
        return <p key={uniqueID2} className={allergy.removable? 'removable' : 'not-removable'}>{allergy.name}</p>
    })




    return(
        <div>
            <br></br>
            <h1>{order.item.name}</h1>
            <p>{order.item.description}</p>
            <h3>Allergies:</h3>
            {allergyList}
            <h3>Allergies Noted For This Dish</h3>
            {filterList}
        </div>
    )
}

export default OrderDetailCard