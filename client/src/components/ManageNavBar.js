import ManageLogoutButton from "./ManageLogoutButton"
import { Link } from "react-router-dom";

function ManageNavBar({setRestaurant, restaurant}) {

    return (
        <nav className="nav-bar">
            <Link to=''>Home</Link>
            <Link to='menu'>Menu Page</Link>
            <Link to='menu/add'>Add New Item</Link>
            <Link to='users' >Manage Users</Link>
            <Link to='restaurant' >Manage Restaurant Information</Link>
            <Link to='/' ><b>User Portal</b></Link>
            <ManageLogoutButton />
        </nav>
    )
}
export default ManageNavBar