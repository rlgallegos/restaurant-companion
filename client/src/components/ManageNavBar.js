import ManageLogoutButton from "./ManageLogoutButton"
import { Link } from "react-router-dom";

function ManageNavBar({setRestaurant, restaurant}) {
    const tailwindDivLink = "my-1 ml-4 border text-m text-gray-100 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out"
    const tailwindLink = "text-gray-700 hover:text-gray-900 active:text-green-600"

    return (
        <div className="p-2 flex justify-auto justify-left md:justify-between">
            <div className="flex-1 flex-grow">
                <nav className='nav-bar flex flex-col sm:flex-row'>
                    <div className="my-1 ml-4 text-m text-gray-100 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link className="text-gray-700 hover:text-gray-900 active:text-green-600" to=''>Home</Link>
                    </div>
                    <div className="my-1 ml-4 text-m text-gray-100 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link className="text-gray-700 hover:text-gray-900 active:text-green-600" to='menu'>Menu Page</Link>
                    </div>
                    <div className="my-1 ml-4 text-m text-gray-100 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link className="text-gray-700 hover:text-gray-900 active:text-green-600" to='menu/add'>Add New Item</Link>
                    </div>
                    <div className="my-1 ml-4 text-m text-gray-100 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link className="text-gray-700 hover:text-gray-900 active:text-green-600" to='users' >Manage Users</Link>
                    </div>
                    <div className="my-1 ml-4 text-m text-gray-100 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link className="text-gray-700 hover:text-gray-900 active:text-green-600" to='restaurant' >Manage Restaurant Information</Link>
                    </div>
                    <div className="my-1 ml-4 text-m text-gray-100 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link className="text-gray-700 hover:text-gray-900 active:text-green-600" to='subscription' >Manage Subscription</Link>
                    </div>
                    {/* <div className="my-1 ml-4 text-m text-gray-100 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link className="text-gray-700 hover:text-gray-900 active:text-green-600" to='/' ><b>User Portal</b></Link>
                    </div> */}
                </nav>
            </div>
            <div className="my-1 text-m text-gray-900 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                <ManageLogoutButton />
            </div>
        </div>
    )
}
export default ManageNavBar