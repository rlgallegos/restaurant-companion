import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderDetailCard from "./OrderDetailCard.js";



function OrderPage({ restID, allergyList, setFilters, orderList, setOrderList, hasOrdered, setHasOrdered}) {
    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        if (location.state) {
            setOrderList([...orderList, location.state])
            setFilters([])
        }
    }, [])

    function handleClick() {
        if (hasOrdered) {
            fetch('/orders', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderList)
            }).then(res => res.json())
            .then(data => {
                navigate(`/user/${orderList[0].item.restaurant_id}/complete-order`, {state: data })
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