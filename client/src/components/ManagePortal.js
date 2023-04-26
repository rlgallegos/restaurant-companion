import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import ManageNavBar from "./ManageNavBar";

function ManagePortal() {
    const [restaurant, setRestaurant] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/check_session')
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                navigate('/manage')
            }
        })
        .then(data => {
            console.log(data)
            setRestaurant(data['restaurant'])
        })
    }, [])

    return (
        <>
            <ManageNavBar />
            {restaurant ? <h1>Manager Portal for {restaurant.name}</h1> : <p>Loading...</p>}
        </>
    )
}
export default ManagePortal