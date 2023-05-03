import { useState } from "react"
import { useFormik } from 'formik';
import * as yup from "yup";


function ManageUserCard({user, onUpdate, isEditing}){
    const tailwindCSS = " mr-2 mb-2 md:ml-4 text-lg text-gray-100 "
    const tailwindCSS2 = "text-sm pl-2 h-8  text-gray-900 text-gray-100 text-gray-100 my-2 w-full"

    // const [isEditing, setIsEditing] = useState(false)
    // function handleClick() {
    //     setIsEditing(!isEditing)
    // }

    //Formik Schema Logic
    const formSchema = yup.object().shape({
        username: yup.string().max(15)
        });

    // //Formik Logic
    const formik = useFormik({
        initialValues: {
            username: '',
            role: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch(`/users/${user.id}`, {
                method: "PATCH",
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

    return (
            <div className="bg-blue-900 bg-opacity-90 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col" >
                <h3 className={tailwindCSS}>{user.username}</h3>
                <p className={tailwindCSS}>{user.role}</p>
                <div>
                    {isEditing &&
                    <form onSubmit={formik.handleSubmit}>
                        <label className={tailwindCSS}>New Username:</label>
                        <input className={tailwindCSS2} type='text' name='username' value={formik.values.username} onChange={formik.handleChange} onClick={(e) => e.stopPropagation()} placeholder='Username' />
                        <label className={tailwindCSS}>Administrator</label>
                        <input type='radio' name='role' value='administrator'onChange={formik.handleChange} onClick={(e) => e.stopPropagation()}/>
                        <br />
                        <label className={tailwindCSS}>User</label>
                        <input type='radio' name='role' value='user' onChange={formik.handleChange} onClick={(e) => e.stopPropagation()}/>
                        <br />
                        <input className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={(e) => e.stopPropagation()} type="submit" />
                    </form>}
                    </div>
                <br />
                {/* <button onClick={handleClick}>Edit</button> */}
                <br />
            </div>
    )
}
export default ManageUserCard