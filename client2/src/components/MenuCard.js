import { useNavigate } from "react-router-dom";

function MenuCard( {item} ) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`/user/${item.restaurant_id}/item/${item.id}`)
    }

    return (
        <div onClick={handleClick} className="bg-gray-100 bg-opacity-80 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 py-12 px-6 mx-10 my-10 flex flex-col border border-transparent hover:border-gray-300 hover:transform hover:scale-110 transition-all duration-300 card">
            <h3 className="text-lg font-bold text-gray-700 my-2" >{item.name}</h3>
            <p className="text-m flex-grow text-gray-600 my-auto " >{item.description}</p>
        </div>
    )
}
export default MenuCard