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



    return (
    <>
        <h2>Order: {location.state.id}</h2>
        <div>
            {location.state.order_items && englishList}
        </div>
        <div style={{float: 'right'}}>
            {orderList && translatedList}
        </div>
    </>
    )
}

export default CompleteOrderPage