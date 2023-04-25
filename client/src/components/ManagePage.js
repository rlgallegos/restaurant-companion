import { useFormik } from 'formik';
import * as yup from "yup";

import ManageSignup from './ManageSignup';
import ManageLogin from './ManageLogin';
import { useState } from 'react';

function ManagePage() {
    const [formType, setFormType] = useState(null)

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
            <div>
                {formType != 'login' && <button name='login' onClick={hanldeClick} >Login</button>}
                {!formType != 'signup' && <button name='signup' onClick={hanldeClick} >Signup</button>}
            </div>
        </div>

    )
}
export default ManagePage