import { useNavigate, useParams } from "react-router-dom";

import SingleItemDetail from "./SingleItemDetail";

function ItemDetailsPage({items, filters, setHasOrdered}) {
    const params = useParams()
    const navigate = useNavigate()
    

    let selected_item = items.find(item => {
        return item.id == params['id']
    })

    function placeOrder(quantity, notes) {
        setHasOrdered(() => true)

        let completed_item_object = {
            item: selected_item,
            filters: filters,
            quantity: quantity,
            notes: notes
        }

        navigate('/user/order', {state: completed_item_object })
    }
    
    return (
        <>
            <br></br>
            {items ? <SingleItemDetail onPlaceOrder={placeOrder} selected_item={selected_item} /> : null}
            <br></br>
        </>
    )
}

export default ItemDetailsPage