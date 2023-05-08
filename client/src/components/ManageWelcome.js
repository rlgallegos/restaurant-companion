import ManageSignup from './ManageSignup';
import ManageLogin from './ManageLogin';

import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ManageWelcome() {
    const tailwindCSSTitle = "text-3xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "my-4 md:my-2 text-m flex-grow text-gray-600 text-center"
    const tailwindCSSButton = "my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"


    // const tailwindButton = "m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400  rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out card"


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
        <div className={'border border-transparent rounded-md bg-gray-100 bg-opacity-80 shadow-md w-4/5 md:w-1/3 mt-5 md:mt-20 mx-auto'}>
            <h1 className={tailwindCSSTitle}>Welcome!</h1>
            <h1 className={tailwindCSSSP}><button className={tailwindCSSButton} name='signup' onClick={hanldeClick} >Sign up</button> -or-  <button className={tailwindCSSButton} name='login' onClick={hanldeClick} >Log in</button></h1>
            <div className='my-4 mx-auto'>
                {formType}
            </div>
        </div>
        
    )
}
export default ManageWelcome