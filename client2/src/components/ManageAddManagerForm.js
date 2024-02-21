import { useFormik } from 'formik';
import * as yup from "yup";

const BACKEND_URL = process.env.REACT_APP_API_URL

function ManageAddManagerForm({setUsers, users}) {
    const tailwindCSSTitle = "text-2xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "ml-2 my-2 text-m flex-grow text-gray-600 text-center md:text-left"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"
    const tailwindCSSButton = "card my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"

    //Formik Schema Logic
    const formSchema = yup.object().shape({
        username: yup.string().max(15).required('Please enter a username'),
        password: yup.string().max(15).required("Please enter a password"),
        passwordCheck: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match.')
        .max(15).required('Please enter a password confirmation')
        });

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
            fetch(`${BACKEND_URL}/users`, {
                method: "POST",
                credentials: 'include',
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
            
            <form onSubmit={formik.handleSubmit} className='rounded-md bg-gray-100 bg-opacity-80 w-5/6 md:w-1/3 my-10 md:mt-20 mx-auto p-12'>
            <h2 className={tailwindCSSTitle}>Add a user</h2>
                <div className='grid grid-cols-2 justify-items-start'>
                    <label className={tailwindCSSSP}>Username:</label>
                    <input className={tailwindCSSInput} type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Username' />
                    <p style={{color: "red"}}>{formik.errors.username}</p>
                    <br />
                    <label className={tailwindCSSSP}>Password:</label>
                    <input className={tailwindCSSInput} type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                    <p style={{color: "red"}}>{formik.errors.password}</p>
                    <br />
                    <label className={tailwindCSSSP}>Re-enter Password:</label>
                    <input className={tailwindCSSInput} type="password" name='passwordCheck' value={formik.values.passwordCheck} onChange={formik.handleChange} placeholder='Re-Enter Password' />
                    <p style={{color: "red"}}>{formik.errors.passwordCheck}</p>                
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 my-4 justify-items-start'>
                    <label className={tailwindCSSSP}>Administrator?</label>
                    <input className='ml-4' type='radio' name='role' value='administrator'onChange={formik.handleChange}/>
                    <label className={tailwindCSSSP}>User?</label>
                    <input className='ml-4' type='radio' name='role' value='user' onChange={formik.handleChange}/>
                    <p style={{color: "red"}}>{formik.errors.role}</p>
                </div>
                <input className={tailwindCSSButton} type="submit" value='Create New User'/>
            </form>
        </div>
    )
}
export default ManageAddManagerForm