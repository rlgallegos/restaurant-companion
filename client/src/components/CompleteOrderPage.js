import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import CompletedOrderItem from "./CompletedOrderItem";


//English - held by the location.state
//Foreign - held by orderList


function CompleteOrderPage({orderList, language}) {
    const location = useLocation()

    let englishList = location.state.order_items.map(item => {
        return <CompletedOrderItem key={item.id} itemName={item.name} quantity={item.quantity} allergies={item.allergies} notes={item.notes} />
    })
    let translatedList = orderList.map(item => {
        return <CompletedOrderItem key={item.item.id} itemName={item.item.name} quantity={item.quantity} allergies={item.filters} notes={item.notes} />
    })

// <h1>English</h1>

    return (
        <>
            <h2 className="text-4xl font-semibold my-6" >Order: {location.state.id}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
                <div className="justify-self-center">
                    <h1 className="text-2xl font-semibold" >English:</h1>
                    {location.state.order_items && englishList}
                </div> 
                <div className="justify-self-center">
                    <h1 className="text-2xl font-semibold">Translation:</h1>
                    {orderList && translatedList}
                </div>
            </div>
        </>
    )
}

export default CompleteOrderPage