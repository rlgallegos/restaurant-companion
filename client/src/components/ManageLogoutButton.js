import { useNavigate } from "react-router-dom";

function ManageLogoutButton() {
    const navigate = useNavigate()

    function handleLogout() {
        fetch('/logout', {
            method: "DELETE",
        }).then(res => {
            if (res.ok) {
                navigate('/manage')
            } else {
                console.log(res.json())
            }
        })
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}
export default ManageLogoutButton