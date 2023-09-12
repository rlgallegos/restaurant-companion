import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_API_URL


function ManagePortal() {
    const [restaurant, setRestaurant] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${BACKEND_URL}/check_session`)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                navigate('/welcome')
            }
        })
        .then(data => {
            setRestaurant(data['restaurant'])
        })
    }, [])

    return (
        <div>

            Old Page Since Orphaned


            {restaurant ? <h1>Manager Portal for {restaurant.name}</h1> : <p>Loading...</p>}
        </div>
    )
}
export default ManagePortal