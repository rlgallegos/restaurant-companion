
import { getAllRestaurants } from "@/app/services/user"
import { RestaurantBasicType } from "@/app/types"

import LowerNavBar from "@/app/(components)/LowerNavBar"

const Restaurants: React.FC = async () => {
    const restaurants: RestaurantBasicType[] = await getAllRestaurants()

    const restaurantCards = restaurants.map(restaurant => {
        return (
            // Individual Card
            <div key={restaurant.id} className="h-48 w-96 bg-slate-200 flex items-center justify-center cursor-pointer border border-transparent rounded-3xl hover:border-secondary">
                <h2>{restaurant.name}</h2>
            </div>
        )
    })
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white-2 bg-center bg-cover">
            <nav className="h-48 w-full flex items-center px-24">
                <h1 className="text-4xl">Restaurants</h1>
            </nav>
            <div className="h-screen w-screen flex flex-wrap gap-12 items-cente justify-evenly overflow-y-scroll">
                {restaurantCards}
            </div>
            <div className="h-[33vh] w-full">
                <LowerNavBar />
            </div>
        </main>
    )
}
export default Restaurants