import { useNavigate } from "react-router-dom";

function MenuCard( {item} ) {
    const navigate = useNavigate()

    //Functionality so ingredient list appears if you click?
    
    function handleClick() {
        navigate(`/item/${item.id}`)
    }

    return (
        <div onClick={handleClick} className="menu-card">
            <h3>{item.name}</h3>
            <img src={item.pic_path} alt="Delicious Food"/>
            <p>{item.description}</p>
        </div>
    )
}
export default MenuCard