import { useNavigate } from "react-router-dom"

function RestaurantCard({restaurant}) {
    const navigate = useNavigate()

    function handleClick() {
        navigate(`user/${restaurant.id}/menu-display`)
    }
    
    let formattedURL = ''
    if (restaurant.url){
        let splitURL = restaurant.url.split('.')
        formattedURL = 'www.' + [splitURL[1], splitURL[2]].join('.')
    }

    return (
        <div onClick={handleClick} className="bg-gray-100 bg-opacity-80 rounded-md shadow-md w-5/6 md:w-1/4 lg:w-1/3 xl:w-1/4 py-12 px-6 mx-10 my-10 items-center border border-transparent hover:border-gray-300 hover:transform hover:scale-110 transition-all duration-300 card">
            <h3 className="text-lg font-bold text-gray-700 my-auto">{restaurant.name}</h3>
            <p className="text-m text-gray-600 mx-0 break-words">{formattedURL}</p>
        </div>
    )
}
export default RestaurantCard