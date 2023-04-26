import { useFormik } from 'formik';
import * as yup from "yup";

import { useNavigate } from "react-router-dom";

function ManageLogin() {
    const navigate = useNavigate()

    //Formik Schema Logic
    const formSchema = yup.object().shape({
        username: yup.string().max(15).required('Please enter a username'),
        password: yup.string().max(15).required("Please enter a password"),
        });

    // //Formik Logic
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        console.log(data)
                        navigate(`/manage/portal/${data.restaurant.id}`)
                    })
                }
            })
        }
    })


    return (
        <>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Username' />
                <br />
                <p style={{color: "red"}}>{formik.errors.username}</p>
                <br />
                <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                <p style={{color: "red"}}>{formik.errors.password}</p>
                <br />
                <br />
                <input type="submit" value='Login'/>
            </form>
        </>
    )
}
export default ManageLogin