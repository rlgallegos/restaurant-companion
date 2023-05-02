import LanugageSelectMenu from './LangageSelectMenu';
import { Link, NavLink } from "react-router-dom";

function NavBar({handleSetLanguage}) {

    return (
        <div className="p-2 flex justify-center flex-col">
            <div className="flex-1">
                <nav className='nav-bar flex flex-col sm:flex-row'>
                    <div className="my-1 ml-4 text-m text-gray-100 rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link to='menu-display' className="text-gray-700 hover:text-gray-900 active:text-green-600">Menu Page</Link>
                    </div>
                    <div className="my-1 ml-4 text-m text-gray-100  rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link to='order' className="text-gray-700 hover:text-gray-900 active:text-green-600">Current Order</Link>
                    </div>
                    <div className="my-1 ml-4 text-m text-gray-100  rounded-md px-4 py-4 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out">
                        <Link to='../welcome' className="text-gray-700 hover:text-gray-900 active:text-green-600"><b>Manager Portal</b></Link>
                    </div>
                </nav>
            </div>
            <div className="flex flex-wrap justify-right">
                <LanugageSelectMenu onSetLanguage={handleSetLanguage} />
            </div>
        </div>
    )
}

export default NavBar