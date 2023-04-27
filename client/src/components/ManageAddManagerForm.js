import { useFormik } from 'formik';
import * as yup from "yup";

function ManageAddManagerForm({setUsers, users}) {

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
            <h2>Add a user</h2>
            <form onSubmit={formik.handleSubmit}>
                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Username' />
                <br />
                <p style={{color: "red"}}>{formik.errors.username}</p>
                <br />
                <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                <p style={{color: "red"}}>{formik.errors.password}</p>
                <br />
                <input type="password" name='passwordCheck' value={formik.values.passwordCheck} onChange={formik.handleChange} placeholder='Re-Enter Password' />
                <br />
                <p style={{color: "red"}}>{formik.errors.passwordCheck}</p>
                <br /><br />
                <label>Administrator</label>
                <input type='radio' name='role' value='administrator'onChange={formik.handleChange}/>
                <label>User</label>
                <input type='radio' name='role' value='user' onChange={formik.handleChange}/>
                <br />
                <br />
                <p style={{color: "red"}}>{formik.errors.role}</p>
                <input type="submit" value='Create New User'/>
            </form>
        </div>
    )
}
export default ManageAddManagerForm