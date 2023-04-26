import ManageLogoutButton from "./ManageLogoutButton"
import { Link } from "react-router-dom";

function ManageNavBar() {




    return (
        <div className="nav-bar">
            <Link to='items'>Menu Page</Link>
            <Link to='items/add'>Add New Item</Link>
            <Link to=''>Home</Link>
            <Link to='users' >Users</Link>
            <ManageLogoutButton />
        </div>

    )
}
export default ManageNavBar