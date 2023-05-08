import { useNavigate } from "react-router-dom"


function RestaurantCard({restaurant}) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`user/${restaurant.id}/menu-display`)
    }


    return (
        <div onClick={handleClick} className="bg-gray-100 bg-opacity-80 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col border border-transparent hover:border-gray-300 hover:transform hover:scale-110 transition-all duration-300 card">
            <h3 className="text-lg font-bold flex-grow text-gray-700 my-auto">{restaurant.name}</h3>
            <p className="my-1 ml-4  text-m flex-grow text-gray-600">{restaurant.url}</p>
        </div>
    )
}
export default RestaurantCard