import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderDetailCard from "./OrderDetailCard.js";



function OrderPage({allergyList, setFilters, orderList, setOrderList, hasOrdered, setHasOrdered}) {
    const location = useLocation()
    const navigate = useNavigate()

    // console.log(orderList)
    // console.log(location.state)

    useEffect(() => {
        if (location.state) {
            setOrderList([...orderList, location.state])
            setFilters([])
        }
    }, [])


    // function handleDeleteAllergy(order, updatedAllergyList) {
    //     let indexToRemove = orderList.indexOf(order)
    //     const newObj = {...order, item: {...order.item, allergies: updatedAllergyList}}

    //     // This part DOES switch out the objects
    //     setOrderList((orderList) => {
    //         return [
    //             ...orderList.slice(0, indexToRemove),
    //             newObj,
    //             ...orderList.slice(indexToRemove + 1)
    //         ]
    //     })
    // }

    function handleClick() {
        if (hasOrdered) {
            //Here is where patch logic would go
            fetch('/orders', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderList)
            }).then(res => res.json())
            .then(data => {
                navigate('/complete-order', {state: data })
            })
        }
    }


    let uniqueID = 0
    let currentOrder = orderList.map(order => {
            uniqueID++
            return <OrderDetailCard allergyList={allergyList} key={uniqueID} order={order} />
        })


    return (
        <div>
            <button onClick={handleClick}>Translate</button>
            <br></br>
            {hasOrdered? currentOrder: <h3>You haven't ordered anything yet...</h3>}
            <br></br>
            {hasOrdered? <button onClick={handleClick}>Translate</button> : null}
            
        </div>
    )
}

export default OrderPage