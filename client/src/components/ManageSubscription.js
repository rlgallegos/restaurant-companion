import { useState } from "react"

import { Navigate } from "react-router-dom"

import ProductDisplay from "./ProductDisplay"

function ManageSubscription({id}){
    const [openForm, setOpenForm] = useState(false)

    function handleCreateSubscription(){
        setOpenForm(!openForm)
    }
    function handleOpenPortal() {
        //fetch to the backend to open the portal
        console.log(id)
        // fetch('/create-portal-session', {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: 
        // })
    }


    return (
        <div>
            <div className="bg-blue-900 bg-opacity-90 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 my-10 flex flex-col mx-auto">
                <button onClick={handleCreateSubscription} className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400  rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">Create Subscription</button>    
            </div>
            {openForm && <Navigate to='result' />}
            <div>
                <button onClick={handleOpenPortal}>Open Portal Manage Subscription</button>
            </div>
        </div>
    )
}
export default ManageSubscription