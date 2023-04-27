import ManageUserCard from "./ManageUserCard"

function ManageManagerDisplay({users}) {
    let userList = []
    if (users) {
        userList = users.map(user => {
            return <ManageUserCard key={user.id} user={user} />
        })
    }

    return (
        <div>
            {users && userList}
        </div>
    )
}
export default ManageManagerDisplay