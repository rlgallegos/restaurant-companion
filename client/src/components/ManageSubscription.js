import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

import ProductDisplay from "./ProductDisplay"

function ManageSubscription({id, setStatus, status}){
    const tailwindCSSDiv = "bg-blue-900 bg-opacity-90 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 my-10 flex flex-col mx-auto"
    const tailwindCSSButton = "m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400  rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out"

    const [openForm, setOpenForm] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [refresh, setRefresh] = useState(false)
    // const [status, setStatus] = useState('')

    const navigate = useNavigate()

    function handleCreateSubscription(){
        setOpenForm(!openForm)
    }

    useEffect(() => {
        fetch('/get-stripe-status', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: id
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setStatus(data.status)
                })
            } else {
                setErrorMessage('Failed to retrieve subscription status. Please refresh page.')
            }
        })
    }, [refresh])

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)
        if (query.get('canceled')) {
            setErrorMessage('Order canceled, you have not been charged.')
        }
    }, [])


    function handleOpenPortal() {
        //fetch to the backend to open the portal
        fetch('/create-portal-session', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: id
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setRefresh(!refresh)
                    window.open(data.url)
                })
            } else {
                setErrorMessage('Only administrators may update payment details')
            }
        })
    }
    return (
        <div>
            {!status || status=='none' &&<div className={tailwindCSSDiv}>
                <button onClick={handleCreateSubscription} className={tailwindCSSButton}>Create Subscription</button>    
            </div>}
            {openForm && <ProductDisplay />}
            {status && status != 'none' && <div className={tailwindCSSDiv}>
                <button onClick={handleOpenPortal} className={tailwindCSSButton}>Manage Subscription via Stripe</button>
            </div>}
            <div>
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
            </div>
        </div>
    )
}
export default ManageSubscription