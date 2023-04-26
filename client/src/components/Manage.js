import ManageMenuDisplay from './ManageMenuDisplay';
import ManageAddItemForm from './ManageAddItemForm';
import ManageUsers from './ManageUsers';
import ManagePortal from './ManagePortal';
import ManageWelcome from './ManageWelcome';
import ManageNavBar from './ManageNavBar';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Manage() {
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/check_session')
        .then(res => {
            if (res.ok) {
                res.json().then(data => navigate(`/manage/portal/${data.restaurant.id}`))
            } else {
                navigate('/manage/welcome')
            }
        })
    }, [])

    return (
        <div>
            <ManageNavBar />
            <Routes>
                <Route 
                path = '/welcome'
                element = {<ManageWelcome />}
                />
                <Route 
                path = '/portal/:id'
                element = {<ManagePortal />}
                />
                <Route
                path = '/portal/:id/items'
                element = {<ManageMenuDisplay />} 
                />
                <Route
                path = '/portal/:id/items/add'
                element = {<ManageAddItemForm />} 
                />
                <Route
                path = '/portal/:id/users'
                element = {<ManageUsers />}
                />
            </Routes>
        </div>

    )
}
export default Manage