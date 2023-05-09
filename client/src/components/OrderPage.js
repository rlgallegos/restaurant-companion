import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderDetailCard from "./OrderDetailCard.js";



function OrderPage({ restID, allergyList, setFilters, orderList, setOrderList, hasOrdered, setHasOrdered}) {

    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSButton2 = "my-1 ml-4 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSSP = "my-1 ml-4  text-lg flex-grow text-gray-900 text-center"

    const location = useLocation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (location.state) {
            setOrderList([...orderList, location.state])
            setFilters([])
        }
    }, [])

    function handleGoBack(){
        navigate(-2)
    }

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
            <button className={tailwindCSSButton2} onClick={handleGoBack}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>
                <p className={tailwindCSSSP}>Continue Ordering</p>
            </button>
            <div className="my-6"></div>
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