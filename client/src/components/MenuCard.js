import { useNavigate } from "react-router-dom";

function MenuCard( {item} ) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/user/${item.restaurant_id}/item/${item.id}`)
    }

    return (
        <div onClick={handleClick} className="bg-blue-900 bg-opacity-90 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col hover:bg-blue-800 card">
            <h3 className="text-lg font-bold flex-grow text-gray-100 my-auto" >{item.name}</h3>
            <p className="my-1 ml-4  text-m flex-grow text-gray-100">{item.description}</p>
        </div>
    )
}
export default MenuCard