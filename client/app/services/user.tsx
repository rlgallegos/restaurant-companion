import { redirect } from 'next/navigation'

import { RestaurantBasicType } from '../types'


const apiDomain = process.env.NEXT_PUBLIC_REACT_APP_API

export async function getAllRestaurants(): Promise<RestaurantBasicType[]> {
    const res = await fetch(`${apiDomain}/restaurants`)
    if (res.ok){
        const data: RestaurantBasicType[] = await res.json()
        return data
    }
    else{
        return redirect('/')
    }
}