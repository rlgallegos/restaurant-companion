import ManageMenuDisplay from './ManageMenuDisplay';
import ManageAddItemForm from './ManageAddItemForm';
import ManageUsers from './ManageUsers';
import ManagePortal from './ManagePortal';
import ManageWelcome from './ManageWelcome';
import ManageNavBar from './ManageNavBar';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Manage() {
    const navigate = useNavigate()
    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
        fetch('/restaurant')
        .then(res => {
            if (res.ok) {
                res.json().then(data => setRestaurant(data))
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
                element = {restaurant && <ManageMenuDisplay restaurant={restaurant}/>} 
                />
                <Route
                path = '/menu/add'
                element = {restaurant &&  <ManageAddItemForm restaurant={restaurant} setRestaurant={setRestaurant} />} 
                />
                <Route
                path = '/users'
                element = {restaurant && <ManageUsers restaurant={restaurant} />}
                />
            </Routes>
        </div>

    )
}
export default Manage