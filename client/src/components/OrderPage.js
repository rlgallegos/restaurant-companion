import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderDetailCard from "./OrderDetailCard.js";



function OrderPage({filters, orderList, setOrderList}) {
    const location = useLocation()
    const navigate = useNavigate()

    function handleGoToMenu() {
        navigate('/')
    }

    useEffect(() => {
        setOrderList([...orderList, location.state])
    }, [])

    console.log(orderList)

    function handleDeleteIngredient(order, updatedIngredientList) {
        // console.log(updatedIngredientList)
        let indexToRemove = orderList.indexOf(order)
        const newObj = {...order, item: {...order.item, ingredients: updatedIngredientList}}


        // This part DOES switch out the objects
        setOrderList((orderList) => {
            return [
                ...orderList.slice(0, indexToRemove),
                newObj,
                ...orderList.slice(indexToRemove + 1)
            ]
        })

    }



    let uniqueID = 0
    let currentOrder = orderList.map(order => {
        uniqueID++
        return <OrderDetailCard key={uniqueID} onDeleteIngredient={handleDeleteIngredient} order={order} />
    })

    return (
        <div>
            <h1>This is the Order Page</h1>
            {currentOrder}
            <button onClick={handleGoToMenu}>Back To Menu</button>
        </div>
    )
}

export default OrderPage