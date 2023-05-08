import { useState } from "react"
import ManageUserCard from "./ManageUserCard"

function ManageManagerDisplay({users, setUsers}) {
    const tailwindCSSButton2 = "my-1 ml-4 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"


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
        <button onClick={handleClick} className={tailwindCSSButton2}>{isEditing ? 'Close Editors' : 'Open Editors'}</button>
        <div className="flex flex-col sm:flex-row justify-center  mx-auto my-8">
            {users && userList}
        </div>
        </>
    )
}
export default ManageManagerDisplay