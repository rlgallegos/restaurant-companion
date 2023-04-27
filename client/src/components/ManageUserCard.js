

function ManageUserCard({user}){
    return (
        <div>
            <h3>{user.username}</h3>
            <p>{user.role}</p>
        </div>
    )
}
export default ManageUserCard