import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';



function ManageSignup() {
    const tailwindCSSSP = "ml-2 my-4 md:my-2 text-m flex-grow text-gray-600 text-center"
    const tailwindCSSButton = "card my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"

    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    //Formik Schema Logic
    const formSchema = yup.object().shape({
        restaurantName: yup.string().max(25).required("Please enter a valid restaurant name"),
        username: yup.string().max(15).required('Please enter a username'),
        password: yup.string().max(15).required("Please enter a password"),
        passwordCheck: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match.')
        .max(15).required('Please enter a password confirmation')
        });

    // //Formik Logic
    const formik = useFormik({
        initialValues: {
            restaurantName: '',
            username: '',
            password: '',
            passwordCheck: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch('/restaurants', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => {
                if (res.ok){
                    res.json().then(() => {
                        navigate(`/manage/subscription`)
                    })
                } else {
                    res.json().then(data => setErrorMessage(data.error))
                    
                }
            })
        }
    })



    return (
        <>
            <form className='flex flex-col mx-6 md:grid md:grid-cols-2 md:gap-4 md:justify-items-start items-center' onSubmit={formik.handleSubmit}>
                <label className={tailwindCSSSP} >Restaurant Name: </label>
                <input className={tailwindCSSInput} type="text" name='restaurantName' value={formik.values.restaurantName} onChange={formik.handleChange} placeholder='Restaurant Name'/>
                <p style={{color: "red", textAlign: 'left'}}>{formik.errors.restaurantName}</p>
                <br />
                <label className={tailwindCSSSP}>Admin Username:</label>
                <input className={tailwindCSSInput} type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Username' />
                <p style={{color: "red", textAlign: 'left'}}>{formik.errors.username}</p>
                <br />
                <label className={tailwindCSSSP}>Password: </label>
                <input className={tailwindCSSInput} type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                <p style={{color: "red", textAlign: 'left'}}>{formik.errors.password}</p>
                <br />
                <label className={tailwindCSSSP}>Confirm Password: </label>
                <input className={tailwindCSSInput} type="password" name='passwordCheck' value={formik.values.passwordCheck} onChange={formik.handleChange} placeholder='Re-Enter Password' />
                <p style={{color: "red", textAlign: 'left'}}>{formik.errors.passwordCheck}</p>
                <br />
                <div className='col-span-2 mx-auto'>
                    <input className={tailwindCSSButton} type="submit" value='Create Restaurant Account'/>
                    {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                </div>
            </form>
        </>
    )
}
export default ManageSignup