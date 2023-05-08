import { useFormik } from 'formik';
import * as yup from "yup";

function ManageRestaurantEditForm({restaurantId, onEditRestaurant}) {

    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "ml-2 my-4 md:my-2 text-m flex-grow text-gray-600 text-center"
    const tailwindCSSButton = "my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"

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
            <h2 className={tailwindCSSSubTitle}>Update Restaurant</h2>
            <p className={tailwindCSSSP}>Enter whichever fields you'd like to update</p>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-items-start'>
                    <label className={tailwindCSSSP}>Restaurant Name:  </label>
                    <input className={tailwindCSSInput} type="text" name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Restaurant Name'/>
                    <p style={{color: "red"}}>{formik.errors.name}</p>
                    <br />
                    <label className={tailwindCSSSP}>Email: </label>
                    <input className={tailwindCSSInput} type="text" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Email'/>
                    <p style={{color: "red"}}>{formik.errors.email}</p>
                    <br />
                    <label className={tailwindCSSSP}>Url: </label>
                    <input className={tailwindCSSInput} type="text" name='url' value={formik.values.url} onChange={formik.handleChange} placeholder='Ex: http://www.google.com'/>
                    <p style={{color: "red"}}>{formik.errors.url}</p>
                    <br />
                </div>
                <h3 className={tailwindCSSSubTitle}>Confirm Administrator Details:</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-items-start'>
                    <label className={tailwindCSSSP}>Username: </label>
                    <input className={tailwindCSSInput} type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Account Administrator Username' />
                    <p style={{color: "red"}}>{formik.errors.username}</p>
                    <br />
                    <label className={tailwindCSSSP}>Password: </label>
                    <input className={tailwindCSSInput} type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                    <p style={{color: "red"}}>{formik.errors.password}</p>
                </div>
                <input className={tailwindCSSButton} type="submit" value='Update Restaurant Account'/>
            </form>
        </div>
    )
}
export default ManageRestaurantEditForm