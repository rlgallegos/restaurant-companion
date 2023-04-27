import { useEffect, useState } from "react"

import RestaurantCard from "./RestaurantCard"



function Welcome({}) {
    const [restaurants, setRestaurants] = useState()

    useEffect(() => {
        fetch('/restaurants')
        .then(res => res.json())
        .then(data => setRestaurants(data))
    }, [])
    console.log(restaurants)

    let restaurantList = []
    if (restaurants) {
        restaurantList = restaurants.map(restaurant => {
            return <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        })
    }



    return (
        <div>
            {restaurants && restaurantList}
        </div>
    )
}

export default Welcome