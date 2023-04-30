import ManageMenuDisplay from './ManageMenuDisplay';
import ManageAddItemForm from './ManageAddItemForm';
import ManageUsers from './ManageUsers';
import ManageNavBar from './ManageNavBar';
import {basicAllergies} from './helpers.js';
import ManageRestaurantEdit from './ManageRestaurantEdit';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Manage() {
    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState(null)
    const [availableAllergies, setAvailableAllergies] = useState([])

    useEffect(() => {
        fetch('/restaurant')
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
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
            {restaurant ? <h1>Manager Portal for {restaurant.name}</h1> : null}
            <Routes>
                <Route
                path = '/menu'
                element = {restaurant && <ManageMenuDisplay availableAllergies={availableAllergies} setAvailableAllergies={setAvailableAllergies} setRestaurant={setRestaurant} restaurant={restaurant}/>} 
                />
                <Route
                path = '/menu/add'
                element = {restaurant &&  <ManageAddItemForm availableAllergies={availableAllergies} setAvailableAllergies={setAvailableAllergies} restaurant={restaurant} setRestaurant={setRestaurant} />} 
                />
                <Route
                path = '/users'
                element = {restaurant && <ManageUsers restaurant={restaurant} />}
                />
                <Route
                path = '/restaurant'
                element = {restaurant && <ManageRestaurantEdit setRestaurant={setRestaurant} restaurant={restaurant} />}
                />
            </Routes>
        </div>

    )
}
export default Manage