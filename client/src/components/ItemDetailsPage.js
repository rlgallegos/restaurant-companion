import { useNavigate, useParams } from "react-router-dom";

function ItemDetailsPage({items, filters}) {
    const params = useParams()
    const navigate = useNavigate()

    let selected_item = items.find(item => {
        return item.id == params['id']
    })
    
    let completed_item_object = {
        item: selected_item,
        filters: filters
    }

    function handleClick() {
        navigate('/order', {state: completed_item_object })
    }
    function handleNavigateHome() {
        navigate('/')
    }

    return (
        <div>
            <button onClick={handleNavigateHome}>Naviate to Menu</button>
            <h1>{selected_item.name}</h1>
            <img src={selected_item.pic_path}></img>
            <p>{selected_item.description}</p>
            {selected_item.kosher? <p>Kosher</p>: null}
            {selected_item.vegan? <p>Vegan</p>: null}
            <button onClick={handleClick}>Add to Order</button>
        </div>
    )
}

export default ItemDetailsPage