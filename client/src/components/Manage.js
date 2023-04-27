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
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        fetch('/restaurant')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setRestaurant(data)
        })
    }, [])

    return (
        <div>
            <ManageNavBar />
            {restaurant ? <h1>Manager Portal for {restaurant.name}</h1> : null}
            <Routes>
                <Route
                path = '/menu'
                element = {restaurant ? <ManageMenuDisplay restaurant={restaurant}/> : <Navigate to='../../welcome'/>} 
                />
                <Route
                path = '/menu/add'
                element = {restaurant ?  <ManageAddItemForm/> : <Navigate to='../../welcome'/>} 
                />
                <Route
                path = '/users'
                element = {restaurant ? <ManageUsers /> : <Navigate to='../../welcome'/>}
                />
            </Routes>
        </div>

    )
}
export default Manage