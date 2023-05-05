import ManageMenuDisplay from './ManageMenuDisplay';
import ManageAddItemForm from './ManageAddItemForm';
import ManageUsers from './ManageUsers';
import ManageNavBar from './ManageNavBar';
import {basicAllergies} from './helpers.js';
import ManageRestaurantEdit from './ManageRestaurantEdit';
import ManageSubscription from './ManageSubscription';
import ManageSubscriptionResult from './ManageSubscriptionResult';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Manage() {
    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState(null)
    const [availableAllergies, setAvailableAllergies] = useState([])
    const [status, setStatus] =useState('')

    useEffect(() => {
        fetch('/restaurant')
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setStatus(data.stripe_status)
                    console.log('status:', data.stripe_status)
                    setRestaurant(data)
                    setAvailableAllergies(basicAllergies)
                    setAvailableAllergies((availableAllergies) => availableAllergies.concat(data.allergies))
                })
            } else {
                navigate('/welcome')
            }
        })
    }, [])

    return (
        <div>
            <ManageNavBar />
            {restaurant ? <h1 className='font-bold text-4xl my-3'>Manager Portal for {restaurant.name}</h1> : null}
            <Routes>
                <Route
                path = '/menu'
                element = {status == 'trial' || status == 'paid' ? <ManageMenuDisplay availableAllergies={availableAllergies} setAvailableAllergies={setAvailableAllergies} setRestaurant={setRestaurant} restaurant={restaurant}/> : <Navigate to='/manage/subscription' />} 
                />
                <Route
                path = '/menu/add'
                element = {status == 'trial' || status == 'paid' ? <ManageAddItemForm availableAllergies={availableAllergies} setAvailableAllergies={setAvailableAllergies} restaurant={restaurant} setRestaurant={setRestaurant} /> : <Navigate to='/manage/subscription' />} 
                />
                <Route
                path = '/users'
                element = {status == 'trial' || status == 'paid' ? <ManageUsers restaurant={restaurant} /> : <Navigate to='/manage/subscription' />}
                />
                <Route
                path = '/subscription'
                element = {restaurant && <ManageSubscription id={restaurant.id} status={status} setStatus={setStatus} />}
                />
                {/* <Route
                path = '/subscription/result'
                element = {restaurant && <ManageSubscriptionResult />}
                /> */}
                <Route
                path = '/restaurant'
                element = {status == 'trial' || status == 'paid' ? <ManageRestaurantEdit setRestaurant={setRestaurant} restaurant={restaurant} /> : <Navigate to='/manage/subscription' />}
                />
            </Routes>
        </div>

    )
}
export default Manage