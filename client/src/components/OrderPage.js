import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderDetailCard from "./OrderDetailCard.js";



function OrderPage({ restID, allergyList, setFilters, orderList, setOrderList, hasOrdered, setHasOrdered}) {

    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSButton2 = "my-1 ml-4 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"


    const location = useLocation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (location.state) {
            setOrderList([...orderList, location.state])
            setFilters([])
        }
    }, [])

    function handleClick() {
        if (hasOrdered) {
            setIsLoading(true)
            fetch('/orders', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderList)
            }).then(res => res.json())
            .then(data => {
                setIsLoading(false)
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
            {hasOrdered && !isLoading ?
            <button onClick={handleClick} className={tailwindCSSButton2}>Translate Order</button>
            : null}
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center">
                {hasOrdered? currentOrder: <h3 className={tailwindCSSSubTitle}>You haven't ordered anything yet...</h3>}
            </div>
            {hasOrdered && !isLoading ? 
            <button onClick={handleClick} className={tailwindCSSButton2}>Translate Order</button>
             : null}
        </div>
    )
}

export default OrderPage