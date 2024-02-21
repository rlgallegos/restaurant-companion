import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import LanugageSelectMenu from './LangageSelectMenu';

function NavBar({ handleSetLanguage }) {
    const tailwindCSSLink = "md:mx-20 my-1 text-m text-gray-100 rounded-md px-4 py-4 hover:bg-gray-100 hover:bg-opacity-90 transition-all duration-200 ease-in-out active:bg-white"
    const tailwindCSSLinkActive = "md:mx-20 my-1 text-m text-gray-100 rounded-md px-4 py-4 border-2 border-white bg-opacity-90 hover:bg-gray-100 transition-all duration-200 ease-in-out active:bg-white"
    const tailwindCSSLinkText = "text-gray-700 hover:text-gray-900 active:text-gray-100"
    const tailwindCSSSP = "my-4 md:my-2 text-m flex-grow text-gray-600"

    const tailwindCSSMenu = 'items-center card mx-2 md:mx-24'

    const navigate =useNavigate()

    const [isActiveMenu, setIsActiveMenu] = useState(true)
    const [isActiveOrder, setIsActiveOrder] = useState(false)
    const [isOpenLanguageMenu, setIsOpenLanguageMenu] = useState(false)
    const [isOpenNavBar, setIsOpenNavBar] = useState(false)

    function handleNavMenu(){
        navigate('menu-display')
        setIsActiveMenu(true)
        setIsActiveOrder(false)
    }
    function handleNavOrder(){
        navigate('order')
        setIsActiveOrder(true)
        setIsActiveMenu(false)
    }
    function handleExpandLanguageMenu(){
        setIsOpenLanguageMenu(!isOpenLanguageMenu)
    }
    function handleExpandNavBar(){
        setIsOpenNavBar(!isOpenNavBar)
    }

    return (
        <div className="p-2 flex justify-items-center flex-col relative">
            <div className="flex md:justify-between">

                <div onClick={handleExpandNavBar} className={tailwindCSSMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <p className={tailwindCSSSP}>Site Navigation</p>
                </div>


                <nav className={`nav-bar flex flex-col sm:flex-row transition-all duration-300 ${isOpenNavBar ? "max-h-screen" : "max-h-0"} overflow-hidden`}>
                    <div className={isActiveMenu ? tailwindCSSLinkActive : tailwindCSSLink} onClick={handleNavMenu}>
                        <Link to='menu-display' className={tailwindCSSLinkText}>Menu Page</Link>
                    </div>
                    <div className={isActiveOrder ? tailwindCSSLinkActive : tailwindCSSLink} onClick={handleNavOrder}>
                        <Link to='order' className={tailwindCSSLinkText}>Current Order</Link>
                    </div>
                </nav>

                <div className={tailwindCSSMenu} onClick={handleExpandLanguageMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                    </svg>
                    <p className={tailwindCSSSP}>Language Selector</p>
                </div>

            </div>
            <div className={`w-full transition-all duration-300 ${isOpenLanguageMenu ? "max-h-screen" : "max-h-0"} overflow-hidden`}>
                <LanugageSelectMenu onSetLanguage={handleSetLanguage} />
            </div>
        </div>
    )
}

export default NavBar