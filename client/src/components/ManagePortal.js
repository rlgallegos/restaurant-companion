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
                navigate('/manage/portal')
            }
        })
        .then(data => {
            console.log(data)
            setRestaurant(data['restaurant'])
        })
    }, [])

    return (
        <div>
            {restaurant ? <h1>Manager Portal for {restaurant.name}</h1> : <p>Loading...</p>}
        </div>
    )
}
export default ManagePortal