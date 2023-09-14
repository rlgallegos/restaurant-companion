import { useState, useEffect } from "react"

import ManageAddManagerForm from "./ManageAddManagerForm"
import ManageManagerDisplay from "./ManageManagerDisplay"

const BACKEND_URL = process.env.REACT_APP_API_URL

function ManageUsers({restaurant}) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${BACKEND_URL}/${restaurant.id}/users`, {credentials: 'include'})
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])

    return (
        <div  >
            <ManageAddManagerForm users={users} setUsers={setUsers} />
            <ManageManagerDisplay users={users} setUsers={setUsers} />
        </div>
    )
}
export default ManageUsers