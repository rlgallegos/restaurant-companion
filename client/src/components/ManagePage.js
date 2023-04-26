
import ManageSignup from './ManageSignup';
import ManageLogin from './ManageLogin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ManagePage() {
    const [formType, setFormType] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/check_session')
        .then(res => {
            if (res.ok) {
                res.json().then(data => navigate(`/manage_portal/${data.restaurant.id}`))
            }
        })
    }, [])


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
export default ManagePage