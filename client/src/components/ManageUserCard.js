import { useFormik } from 'formik';
import * as yup from "yup";

const BACKEND_URL = process.env.REACT_APP_API_URL

function ManageUserCard({user, onUpdate, onDelete, onError, isEditing}){
    const tailwindCSSSP2 = "mb-4 text-lg flex-grow text-gray-600 text-center"
    const tailwindCSSSP = "ml-2 my-2 text-m flex-grow text-gray-600 text-center md:text-left"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"
    const tailwindCSSButton = "card mt-4 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSCard = "bg-gray-100 bg-opacity-80 rounded-md shadow-md sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col border border-transparent "
    const tailwindCSSButton2 = "mx-auto card mt-4 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-400 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"


    //Formik Schema Logic
    const formSchema = yup.object().shape({
        username: yup.string().max(15)
        });

    const formik = useFormik({
        initialValues: {
            username: '',
            role: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch(`${BACKEND_URL}/users/${user.id}`, {
                method: "PATCH",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => res.json())
            .then(data => {
                onUpdate(data)
            })
        }
    })

    //DELETE user
    function handleDeleteUser(){
        fetch(`${BACKEND_URL}/users/${user.id}`, {
            method: "DELETE",
            credentials: 'include'
        }).then(res => {
            if (res.ok){
                onDelete(user)
            } else {
                res.json().then(data => onError(data))
            }
        })
    }


    return (
            <div className={tailwindCSSCard} >
                <h3 className={tailwindCSSSubTitle}>{user.username}</h3>
                <p className={tailwindCSSSP2}>Role: {user.role}</p>
                <div className="">
                    {isEditing &&
                    <form onSubmit={formik.handleSubmit}>
                        <label className={tailwindCSSSP}>New Username:</label>
                        <input className={tailwindCSSInput} type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onClick={(e) => e.stopPropagation()} placeholder='Username' />
                        <label className={tailwindCSSSP}>Administrator</label>
                        <input type='radio' name='role' value='administrator'onChange={formik.handleChange} onClick={(e) => e.stopPropagation()}/>
                        <br />
                        <label className={tailwindCSSSP}>User</label>
                        <input type='radio' name='role' value='user' onChange={formik.handleChange} onClick={(e) => e.stopPropagation()}/>
                        <br />
                        <input className={tailwindCSSButton} onClick={(e) => e.stopPropagation()} type="submit" />
                    </form>}
                    </div>
                <br />
                <br />
                <button className={tailwindCSSButton2} onClick={handleDeleteUser}>Delete</button>
            </div>
    )
}
export default ManageUserCard