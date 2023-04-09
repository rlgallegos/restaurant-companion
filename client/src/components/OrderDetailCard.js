import { useEffect, useState } from 'react';

function OrderDetailCard({order, onDeleteIngredient}) {
    const [ingredientObjectList, setIngredientObjectList] = useState(order.item.ingredients)

    //Build Lists
    let uniqueID = 0
    let filterList = order.filters.map(filter => {
        uniqueID++
        return <p key={uniqueID}>{filter}</p>
    })

    let uniqueID2 = 0
    let ingredientList = ingredientObjectList.map(ingredient => {
        uniqueID2++
        return <p key={uniqueID2} className={ingredient.removable? 'removable' : 'not-removable'} onClick={handleClick}>{ingredient.name}</p>
    })


    useEffect(() => {
        onDeleteIngredient(order, ingredientObjectList)
    }, [ingredientObjectList])



    //Handle Item Removal
    function handleClick(e) {
        if (e.target.className === 'removable') {
            setIngredientObjectList((ingredientObjectList) => {
                return ingredientObjectList.filter(ingredient => ingredient.name !== e.target.textContent)
            })
        }
    }

    return(
        <div>
            <img src={order.item.pic_path}></img>
            <h1>{order.item.name}</h1>
            <p>{order.item.description}</p>
            <h3>Ingredients:</h3>
            {ingredientList}
            <h3>Allergies Noted For This Dish</h3>
            {filterList}
        </div>
    )
}

export default OrderDetailCard