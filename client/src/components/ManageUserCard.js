import { useState } from "react"
import { useFormik } from 'formik';
import * as yup from "yup";


function ManageUserCard({user}){
    const [isEditing, setIsEditing] = useState(false)
    function handleClick() {
        setIsEditing(!isEditing)
    }

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
            console.log(values)
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => res.json())
            .then(data => {
                console.log(data)
            })
        }
    })

    return (
        <div>
            <div>
                <h3>{user.username}</h3>
                <p>{user.role}</p>
                <div>
                    {isEditing &&
                    <form onSubmit={formik.handleSubmit}>
                        <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Username' />
                        <br /><br />
                        <label>Administrator</label>
                        <input type='radio' name='role' value='administrator'onChange={formik.handleChange}/>
                        <label>User</label>
                        <input type='radio' name='role' value='user' onChange={formik.handleChange}/>
                        <br />
                        <input type="submit" />
                    </form>}
                    </div>
                <br />
                <button onClick={handleClick}>Edit</button>
                <br />
            </div>
        </div>

    )
}
export default ManageUserCard