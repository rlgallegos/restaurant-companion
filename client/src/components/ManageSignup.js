import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";



function ManageSignup() {
    const tailwindCSS = " mr-2 mb-2 md:ml-4 text-lg text-gray-100 "
    const tailwindCSS2 = "text-sm pl-2 h-8  text-gray-900 text-gray-100 text-gray-100 my-2 w-full sm:w-3/4"


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
                    res.json().then(data => {
                        console.log(data)
                        navigate(`/manage/portal/${data.id}`)
                    })
                }
            })
        }
    })



    return (
        <>
            <form className='flex flex-col mx-6 md:grid md:grid-cols-2 md:gap-4 md:justify-items-start items-center' onSubmit={formik.handleSubmit}>
                <label className={tailwindCSS} >Restaurant Name: </label>
                <input className={tailwindCSS2} type="text" name='restaurantName' value={formik.values.restaurantName} onChange={formik.handleChange} placeholder='Restaurant Name'/>
                <p style={{color: "red", textAlign: 'left'}}>{formik.errors.restaurantName}</p>
                <br />
                <label className={tailwindCSS}>Admin Username:</label>
                <input className={tailwindCSS2} type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Username' />
                <p style={{color: "red", textAlign: 'left'}}>{formik.errors.username}</p>
                <br />
                <label className={tailwindCSS}>Password: </label>
                <input className={tailwindCSS2} type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                <p style={{color: "red", textAlign: 'left'}}>{formik.errors.password}</p>
                <br />
                <label className={tailwindCSS}>Confirm Password: </label>
                <input className={tailwindCSS2} type="password" name='passwordCheck' value={formik.values.passwordCheck} onChange={formik.handleChange} placeholder='Re-Enter Password' />
                <p style={{color: "red", textAlign: 'left'}}>{formik.errors.passwordCheck}</p>
                <br />
                <div className='col-span-2 mx-auto'>
                    <input className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400  rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out card" type="submit" value='Create Restaurant Account'/>
                </div>

            </form>
        </>
    )
}
export default ManageSignup