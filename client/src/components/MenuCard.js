import { useNavigate } from "react-router-dom";

function MenuCard( {item} ) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/user/${item.restaurant_id}/item/${item.id}`)
    }

    return (
        <div onClick={handleClick} className="menu-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
        </div>
    )
}
export default MenuCard