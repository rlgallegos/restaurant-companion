import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import ManageAddManagerForm from "./ManageAddManagerForm"
import ManageManagerDisplay from "./ManageManagerDisplay"


function ManageUsers() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/check_session')
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                navigate('/welcome')
            }
        }).then(data => {
            console.log(data)
            setUsers(...users, data['restaurant']['users'])
        })
    }, [])

    return (
        <div>
            <ManageAddManagerForm users={users} setUsers={setUsers} />
            <ManageManagerDisplay users={users} />
        </div>
    )
}
export default ManageUsers