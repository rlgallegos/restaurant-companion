import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";



function ManageSignup() {
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
                    res.json(data => {
                        navigate(`/manage/portal/${data.id}`)
                    })
                } else {
                    navigate('/welcome')
                }
            })
        }
    })



    return (
        <>
            <h2>Sign up a new restaurant</h2>
            <form onSubmit={formik.handleSubmit}>
                <label>Restaurant Name:  </label>
                <input type="text" name='restaurantName' value={formik.values.restaurantName} onChange={formik.handleChange} placeholder='Restaurant Name'/>
                <br />
                <p style={{color: "red"}}>{formik.errors.restaurantName}</p>
                <br />
                <label>Username:  </label>
                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Account Administrator Username' />
                <br />
                <p style={{color: "red"}}>{formik.errors.username}</p>
                <br />
                <label>Password:  </label>
                <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                <p style={{color: "red"}}>{formik.errors.password}</p>
                <br />
                <label>Confirm Password:  </label>
                <input type="password" name='passwordCheck' value={formik.values.passwordCheck} onChange={formik.handleChange} placeholder='Re-Enter Password' />
                <br />
                <p style={{color: "red"}}>{formik.errors.passwordCheck}</p>
                <br />
                <input type="submit" value='Create Restaurant Account'/>
            </form>
        </>
    )
}
export default ManageSignup