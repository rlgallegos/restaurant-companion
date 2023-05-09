import '../App.css';

import { Routes, Route, useNavigate, NavLink } from 'react-router-dom';
import Manage from './Manage';
import Welcome from './Welcome';
import User from './User';
import ManageWelcome from './ManageWelcome';
import { useEffect, useState } from 'react';
import Server from './Server';


// const imageUrl = `url('hexagon-background.jpg?t=${Date.now()}')`

function App() {
  const tailwindCSSLink = "my-1 mx-auto text-m text-gray-100 rounded-md px-4 py-4 hover:bg-gray-100 hover:bg-opacity-90 transition-all duration-200 ease-in-out active:bg-white"
  const tailwindCSSLinkText = "text-gray-700 hover:text-gray-900 active:text-gray-100"
  const tailwindCSSLinkActive = "my-1 mx-auto text-m text-gray-100 rounded-md px-4 py-4 border-2 border-white bg-opacity-90 hover:bg-gray-100 transition-all duration-200 ease-in-out active:bg-white"

  const navigate = useNavigate()
  const [isActiveUser, setIsActiveUser] = useState(false)
  const [isActiveManager, setIsActiveManger] = useState(false)
  
  function handleClick() {
    navigate('/')
    setIsActiveUser(true)
    setIsActiveManger(false)
  }
  function handleNavManagerPortal(){
    navigate('/welcome')
    setIsActiveManger(true)
    setIsActiveUser(false)
  }

  useEffect(() => {
    const pathName = window.location.pathname;

    switch (true){
      case pathName === '/' || pathName === '/welcome':
        setIsActiveUser(true)
        setIsActiveManger(false)
      case /^\/user\/.+/.test(pathName):
        setIsActiveUser(true)
        setIsActiveManger(false)
        break
      case /^\/manage\/.+/.test(pathName):
        setIsActiveManger(true)
        setIsActiveUser(false)
        break
      default:
        setIsActiveManger(false)
        setIsActiveUser(false)
    }
  }, [])

  return (
    <div className="bg-gray-400 min-h-screen md:bg-cover md:bg-center bg-fixed text-center App ">
      <header className="bg-transparent text-gray-100 px-4 py-8 flex flex-col md:gap-8 items-center">
        <h1 onClick={handleClick} className="text-4xl font-bold text-gray-700" >The Restaurant Companion</h1>
        <nav className='flex justify-between gap-0 w-full'>
            <div className={isActiveUser ? tailwindCSSLinkActive : tailwindCSSLink} onClick={handleClick}>
                <NavLink className={tailwindCSSLinkText}  to='/' ><b>User Portal</b></NavLink>
            </div>
            <div className={isActiveManager ? tailwindCSSLinkActive :tailwindCSSLink} onClick={handleNavManagerPortal}>
                <NavLink to='/welcome' className={tailwindCSSLinkText} ><b>Manager Portal</b></NavLink>
            </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route 
            path = '/'
            element = {<Welcome />}
          />
          <Route 
            path = '/welcome'
            element = {<ManageWelcome />}
          />
          <Route 
            path = '/server'
            element = {<Server />}
          />
          <Route 
          path = '/user/:id/*'
          element = {<User />}     
          />
          <Route 
          path = '/manage/*'
          element = {<Manage />}     
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
