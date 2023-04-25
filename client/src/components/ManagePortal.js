import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


function ManagePortal() {
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
        .then(data => console.log(data))
    }, [])

    return (
        <p>Reached manager Portal</p>
    )
}
export default ManagePortal