import { useState } from "react"

import CompletedOrderItem from "./CompletedOrderItem"

function Server(){
    const tailwindCSSCard = "bg-gray-100 bg-opacity-80 rounded-md shadow-md w-4/5 md:w-2/3 xl:w-1/4 p-12 mx-auto my-10 overflow-x-hidden"
    const tailwindCSSTitle = "text-3xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "ml-2 my-4 md:my-2 text-m flex-grow text-gray-600 text-center"
    const tailwindCSSButton = "card my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSCard2 = "bg-gray-100 bg-opacity-40 rounded-md shadow-md w-4/5 md:w-2/3 p-4 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 md:gap-4 "


    const [orderID, setOrderID] = useState('')
    const [order, setOrder] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e){
        setOrderID(e.target.value)
    }
    
    function handleSubmit(e){
        if (!orderID) return
        setIsLoading(true)
        e.preventDefault()
        fetch(`/order/${orderID}`)
        .then(res => {
            if (!res.ok) return
            if (res.ok){
                res.json().then(data => {
                    setOrder(data)
                    setIsLoading(false)
                    setOrderID('')
                })
            }
        })
    }
    let orderCards = []
    if (order){
        orderCards = order.order_items.map(item => {
            return <CompletedOrderItem key={item.id} itemName={item.name} quantity={item.quantity} allergies={item.allergies} notes={item.notes} />
        })
    }

    return (
        <div className="max-w-full mx-auto">
            <div className={tailwindCSSCard}>
                {order && <h1 className={tailwindCSSTitle}>You've found order number: {order.id}</h1>}
                {!isLoading ? <form onSubmit={handleSubmit}>
                    <label className={tailwindCSSSP}>Order ID:</label>
                    <input className={tailwindCSSInput} type="text" placeholder="Enter the Order ID." value={orderID} onChange={handleChange} />
                    <br />
                    <input className={tailwindCSSButton} type="submit" />
                </form>  : <h3 className={tailwindCSSSubTitle}>Retrieving information...</h3> }
            </div>
            {order && <div className={tailwindCSSCard2}>
                {order && orderCards}
            </div>}   
        </div>
    )

}
export default Server