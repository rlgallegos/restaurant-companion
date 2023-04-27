import { useNavigate } from "react-router-dom"


function RestaurantCard({restaurant}) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`user/${restaurant.id}/menu-display`)
    }

    return (
        <div>
            <h3>{restaurant.name}</h3>
            <button onClick={handleClick}>Check out menu</button>
        </div>
    )
}
export default RestaurantCard