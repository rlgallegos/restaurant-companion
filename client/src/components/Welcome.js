import { useEffect, useState } from "react"

import RestaurantCard from "./RestaurantCard"



function Welcome({}) {
    const [restaurants, setRestaurants] = useState()

    useEffect(() => {
        fetch('/restaurants')
        .then(res => res.json())
        .then(data => setRestaurants(data))
    }, [])

    let restaurantList = []
    if (restaurants) {
        restaurantList = restaurants.map(restaurant => {
            return <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        })
    }



    return (
        <>
        <h1 className=" text-gray-900 text-4xl font-bold px-4 py-8 flex justify-center items-center mb-3">Available Restaurants</h1>
        <div className="flex flex-wrap justify-center max-w-screen-xl mx-auto my-8" >
            {restaurants && restaurantList}
        </div>    
        </>

    )
}

export default Welcome