import ManageLogoutButton from "./ManageLogoutButton"
import { Link } from "react-router-dom";

function ManageNavBar() {


    return (
        <nav className="nav-bar">
            <Link to='portal/:id/items'>Menu Page</Link>
            <Link to='portal/:id/items/add'>Add New Item</Link>
            <Link to='portal/:id'>Home</Link>
            <Link to='portal/:id/users' >Users</Link>
            <Link to='../user' ><b>User Portal</b></Link>
            <ManageLogoutButton />
        </nav>
    )
}
export default ManageNavBar