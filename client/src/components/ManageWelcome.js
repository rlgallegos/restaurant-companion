import ManageSignup from './ManageSignup';
import ManageLogin from './ManageLogin';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ManageWelcome() {
    const tailwindButton = "m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400  rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out"


    useEffect(() => {
        fetch('/check_session')
        .then(res => {
            if (res.ok) {
                navigate('/manage')
            }
        })
    }, [])


    const [formType, setFormType] = useState(null)
    const navigate = useNavigate()

    function hanldeClick(e){
        switch(e.target.name) {
            case 'login':
              setFormType(<ManageLogin />)
              break;
            case 'signup':
              setFormType(<ManageSignup />)
              break;
            default:
              setFormType(null)
          }
    }


    return (
        <div className='border border-blue-900 rounded-md bg-blue-900 bg-opacity-90 w-4/5 md:w-1/3 mt-5 md:mt-20 mx-auto'>
            <h1 className='my-4 text-3xl text-gray-100'>Welcome!</h1>
            <h1 className='text-gray-100'><button className={tailwindButton} name='signup' onClick={hanldeClick} >Sign up</button> -or-  <button className={tailwindButton} name='login' onClick={hanldeClick} >Log in</button></h1>
            <div className='my-4 mx-auto'>
                {formType}
            </div>
        </div>
        
    )
}
export default ManageWelcome