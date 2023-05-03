import { useState } from "react"
import ManageUserCard from "./ManageUserCard"

function ManageManagerDisplay({users, setUsers}) {
    const [isEditing, setIsEditing] = useState(false)
    function handleClick() {
        setIsEditing(!isEditing)
    }


    let userList = []

    function handleUpdate(user) {
        const indexToUpdate = users.findIndex(each => each.id === user.id)
        const newArray = [...users]
        newArray.splice(indexToUpdate, 1, user)
        setUsers(newArray)
    }


    if (users) {
        userList = users.map(user => {
            return <ManageUserCard key={user.id} user={user} onUpdate={handleUpdate} isEditing={isEditing} />
        })
    }



    return (
        <>
        <button onClick={handleClick} className="mt-8 ml-auto text-m flex-grow text-gray-900 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">Open Editors</button>
        <div className="flex flex-col sm:flex-row justify-center max-w-screen-xl mx-auto my-8">
            {users && userList}
        </div>
        </>
    )
}
export default ManageManagerDisplay