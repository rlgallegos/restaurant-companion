import { useNavigate } from "react-router-dom";

function ManageLogoutButton() {
    const tailwindCSSButton2 = "my-1 ml-4 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const navigate = useNavigate()

    function handleLogout() {
        fetch('/logout', {
            method: "DELETE",
        }).then(res => {
            if (res.ok) {
                navigate('/welcome')
            } else {
                console.log(res.json())
            }
        })
    }

    return (
        <button className={tailwindCSSButton2} onClick={handleLogout}>Logout</button>
    )
}
export default ManageLogoutButton