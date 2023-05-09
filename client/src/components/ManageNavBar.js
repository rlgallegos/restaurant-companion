import { useEffect, useState } from "react";
import ManageLogoutButton from "./ManageLogoutButton"
import { Link, useNavigate } from "react-router-dom";

function ManageNavBar({setRestaurant, restaurant}) {
    const tailwindCSSLink = "flex items-center my-1 text-m text-gray-100 rounded-md px-4 hover:bg-gray-100 hover:bg-opacity-90 transition-all duration-200 ease-in-out active:bg-white"
    const tailwindCSSLinkActive = "flex items-center my-1 text-m text-gray-100 rounded-md px-4 border-2 border-white bg-opacity-90 hover:bg-gray-100 transition-all duration-200 ease-in-out active:bg-white"
    const tailwindCSSLinkText = "text-gray-700 hover:text-gray-900 active:text-gray-100"

    const tailwindCSSMenu = 'items-center card items-align-left'

    const navigate = useNavigate()
    const [isOpenNavBar, setIsOpenNavBar] = useState(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ? false : true
      );


    const [isActiveHome, setIsaActiveHome] = useState(true)
    const [isActiveMenu, setIsActiveMenu] = useState(false)
    const [isActiveNewItem, setIsActiveNewItem] = useState(false)
    const [isActiveUsers, setIsActiveUsers] = useState(false)
    const [isActiveRestaurant, setIsaActiveRestaurant] = useState(false)
    const [isActiveSubscription, setIsActiveSubscription] = useState(false)

    function clearNavBar(){
        setIsActiveMenu(null)
        setIsActiveSubscription(null)
        setIsActiveUsers(null)
        setIsaActiveRestaurant(null)
        setIsaActiveHome(null)
        setIsActiveNewItem(null)
    }

    function handleNavHome(){
        clearNavBar()
        navigate('')
        setIsaActiveHome(true)
    }
    function handleNavMenu(){
        clearNavBar()
        navigate('menu')
        setIsActiveMenu(true)
    }
    function handleNavUsers(){
        clearNavBar()
        navigate('users')
        setIsActiveUsers(true)
    }
    function handleNavRest(){
        clearNavBar()
        navigate('restaurant')
        setIsaActiveRestaurant(true)
    }
    function handleNavSub(){
        clearNavBar()
        navigate('subscription')
        setIsActiveSubscription(true)
    }
    function handleNavAddNewItem(){
        clearNavBar()
        navigate('menu/add')
        setIsActiveNewItem(true)
    }

    // Evaluate location on page/refresh
    useEffect(() => {
        switch (window.location.pathname){
            case '/manage/subscription':
                clearNavBar()
                setIsActiveSubscription(true)
                break
            case '/manage/menu/add':
                clearNavBar()
                setIsActiveNewItem(true)
                break
            case '/manage/menu':
                clearNavBar()
                setIsActiveMenu(true)
                break
            case '/manage/users':
                clearNavBar()
                setIsActiveUsers(true)
                break
            case '/manage/restaurant':
                clearNavBar()
                setIsaActiveRestaurant(true)
                break
            case '':
                clearNavBar()
                setIsaActiveHome(true)
                break
        }
    }, [])



    function handleExpandNavBar(){
        setIsOpenNavBar(!isOpenNavBar)
    }


    return (
        <div className="p-2 flex justify-auto justify-left md:justify-between mx-40">
            <div className="flex-1 flex-grow">
                <div onClick={handleExpandNavBar} className={tailwindCSSMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    {/* <p className={tailwindCSSSP}>Expand Nav Bar Menu</p> */}
                </div>

                
                <nav className={`justify-between text-center flex flex-col sm:flex-row transition-all duration-300 ${isOpenNavBar ? "max-h-screen" : "max-h-0"} overflow-hidden`}>

                    <div className={isActiveHome ? tailwindCSSLinkActive : tailwindCSSLink} onClick={handleNavHome}>
                        <Link className={tailwindCSSLinkText} to=''>Home</Link>
                    </div>
                    <div className={isActiveMenu ? tailwindCSSLinkActive : tailwindCSSLink} onClick={handleNavMenu} >
                        <Link className={tailwindCSSLinkText} to='menu'>Menu Page</Link>
                    </div>
                    <div className={isActiveNewItem ? tailwindCSSLinkActive : tailwindCSSLink} onClick={handleNavAddNewItem}>
                        <Link className={tailwindCSSLinkText} to='menu/add'>Add New Item</Link>
                    </div>
                    <div className={isActiveUsers ? tailwindCSSLinkActive : tailwindCSSLink} onClick={handleNavUsers}>
                        <Link className={tailwindCSSLinkText} to='users' >Users</Link>
                    </div>
                    <div className={isActiveRestaurant ? tailwindCSSLinkActive : tailwindCSSLink} onClick={handleNavRest}>
                        <Link className={tailwindCSSLinkText} to='restaurant' >Restaurant Information</Link>
                    </div>
                    <div className={isActiveSubscription ? tailwindCSSLinkActive : tailwindCSSLink} onClick={handleNavSub}>
                        <Link className={tailwindCSSLinkText} to='subscription' >Subscription</Link>
                    </div>

                    <div >
                        <ManageLogoutButton />
                    </div>
                </nav>

            </div>
        </div>
    )
}
export default ManageNavBar