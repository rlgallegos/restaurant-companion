import { useFormik } from 'formik';
import * as yup from "yup";

function ManageAddManagerForm({setUsers, users}) {
    const tailwindCSS = "m-auto mr-2 mb-2 md:mb-auto md:ml-4 text-lg flex-grow text-gray-100 "
    const tailwindCSS2 = "text-sm pl-2 h-8  flex-grow text-gray-900 text-gray-100 text-gray-100 my-2 w-full"


    //Formik Schema Logic
    const formSchema = yup.object().shape({
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
            username: '',
            password: '',
            passwordCheck: '',
            role: '',
            restID: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            console.log(values)
            fetch('/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => res.json())
            .then(data => {
                setUsers([...users, data])
            })
        }
    })
    if (users[0]) {
        formik.values.restID = users[0].restaurant_id
    }


    return (
        <div>
            <h2 className="my-4 text-lg">Add a user</h2>
            <form onSubmit={formik.handleSubmit} className='border border-blue-900 rounded-md bg-blue-900 bg-opacity-90 w-4/5 md:w-1/3 my-10 md:mt-20 mx-auto p-12'>
                <div className='grid grid-cols-2 justify-items-start'>
                    <label className={tailwindCSS}>Username:</label>
                    <input className={tailwindCSS2} type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Username' />
                    <p style={{color: "red"}}>{formik.errors.username}</p>
                    <br />
                    <label className={tailwindCSS}>Password:</label>
                    <input className={tailwindCSS2} type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                    <p style={{color: "red"}}>{formik.errors.password}</p>
                    <br />
                    <label className={tailwindCSS}>Re-enter Password:</label>
                    <input className={tailwindCSS2} type="password" name='passwordCheck' value={formik.values.passwordCheck} onChange={formik.handleChange} placeholder='Re-Enter Password' />
                    <p style={{color: "red"}}>{formik.errors.passwordCheck}</p>                
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 my-4 justify-items-start'>
                    <label className={tailwindCSS}>Administrator?</label>
                    <input className='ml-4' type='radio' name='role' value='administrator'onChange={formik.handleChange}/>
                    <label className={tailwindCSS}>User?</label>
                    <input className='ml-4' type='radio' name='role' value='user' onChange={formik.handleChange}/>
                    <p style={{color: "red"}}>{formik.errors.role}</p>
                </div>
                <input className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" type="submit" value='Create New User'/>
            </form>
        </div>
    )
}
export default ManageAddManagerForm