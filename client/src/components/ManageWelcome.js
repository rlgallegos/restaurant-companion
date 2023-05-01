import ManageSignup from './ManageSignup';
import ManageLogin from './ManageLogin';

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ManageWelcome() {
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
        <div>
            <h1>Sign Up or Log In Below:</h1>
            <div>
                {formType}
            </div>
            <br /><br />
            <div>
                {formType != 'login' && <button name='login' onClick={hanldeClick} >Login Form</button>}
                {!formType != 'signup' && <button name='signup' onClick={hanldeClick} >SignupForm</button>}
            </div>
        </div>
        
    )
}
export default ManageWelcome