import { useFormik } from 'formik';
import * as yup from "yup";

function ManageRestaurantEditForm({restaurantId, onEditRestaurant}) {

    //Formik Schema Logic
    const formSchema = yup.object().shape({
        name: yup.string().max(25),
        email: yup.string().email(),
        url: yup.string().url(),

        username: yup.string().max(15).required("Please enter an administrator's username"),
        password: yup.string().max(15).required("Please enter the administrator's password")
        });


    // //Formik Logic
    const formik = useFormik({
        initialValues: {
            restaurantID: 0,
            name: '',
            username: '',
            password: '',
            email: '',
            url: ''
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            formik.values.restaurantID = restaurantId
            fetch('/restaurant', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => {
                if (res.ok){
                    res.json().then(data => {
                        console.log(data)
                        onEditRestaurant(data)
                    })
                }
            })
        }
    })









    return (
        <div>
            
            <h2>Update Restaurant</h2>
            <p>Please enter whichever fields you'd like to update</p>
            <form onSubmit={formik.handleSubmit}>
                <label>Restaurant Name:  </label>
                <input type="text" name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Restaurant Name'/>
                <br />
                <p style={{color: "red"}}>{formik.errors.name}</p>
                <br />
                <label>Email: </label>
                <input type="text" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Email'/>
                <br />
                <p style={{color: "red"}}>{formik.errors.email}</p>
                <br />
                <label>Url: </label>
                <input type="text" name='url' value={formik.values.url} onChange={formik.handleChange} placeholder='Example: http://www.google.com'/>
                <br />
                <p style={{color: "red"}}>{formik.errors.url}</p>
                <br />
                <h3>Confirm Administrator Details:</h3>
                <label>Username: </label>
                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Account Administrator Username' />
                <br />
                <p style={{color: "red"}}>{formik.errors.username}</p>
                <br />
                <label>Password: </label>
                <input type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                <p style={{color: "red"}}>{formik.errors.password}</p>
                <br />
                <br />
                <input type="submit" value='Update Restaurant Account'/>
            </form>
        </div>
    )
}
export default ManageRestaurantEditForm