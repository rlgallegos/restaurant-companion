import { useState, useEffect } from "react"

import ManageAddManagerForm from "./ManageAddManagerForm"
import ManageManagerDisplay from "./ManageManagerDisplay"


function ManageUsers({restaurant}) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`/${restaurant.id}/users`, {})
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