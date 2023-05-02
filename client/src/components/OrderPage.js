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
            <button onClick={handleClick} className="mt-8 ml-auto text-m flex-grow text-gray-900 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">Translate Order</button>
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center">
                {hasOrdered? currentOrder: <h3>You haven't ordered anything yet...</h3>}
            </div>
            {hasOrdered? <button onClick={handleClick} className="my-8 ml-auto text-m flex-grow text-gray-900 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">Translate Order</button> : null}
        </div>
    )
}

export default OrderPage