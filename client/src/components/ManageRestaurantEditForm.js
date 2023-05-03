import { useFormik } from 'formik';
import * as yup from "yup";

function ManageRestaurantEditForm({restaurantId, onEditRestaurant}) {
    const tailwindCSS = " mr-2 mb-2 md:ml-4 text-lg text-gray-100 "
    const tailwindCSS2 = "text-sm pl-2 h-8  text-gray-900 text-gray-100 text-gray-100 my-2 w-full"

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
            <h2 className='text-2xl text-gray-100'>Update Restaurant</h2>
            <p className={tailwindCSS}>Enter whichever fields you'd like to update</p>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-items-start'>
                    <label className={tailwindCSS}>Restaurant Name:  </label>
                    <input className={tailwindCSS2} type="text" name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Restaurant Name'/>
                    <p style={{color: "red"}}>{formik.errors.name}</p>
                    <br />
                    <label className={tailwindCSS}>Email: </label>
                    <input className={tailwindCSS2} type="text" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder='Email'/>
                    <p style={{color: "red"}}>{formik.errors.email}</p>
                    <br />
                    <label className={tailwindCSS}>Url: </label>
                    <input className={tailwindCSS2} type="text" name='url' value={formik.values.url} onChange={formik.handleChange} placeholder='Ex: http://www.google.com'/>
                    <p style={{color: "red"}}>{formik.errors.url}</p>
                    <br />
                </div>
                <h3 className='text-xl text-gray-100 mb-4'>Confirm Administrator Details:</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 justify-items-start'>
                    <label className={tailwindCSS}>Username: </label>
                    <input className={tailwindCSS2} type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Account Administrator Username' />
                    <p style={{color: "red"}}>{formik.errors.username}</p>
                    <br />
                    <label className={tailwindCSS}>Password: </label>
                    <input className={tailwindCSS2} type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder='Password' />
                    <p style={{color: "red"}}>{formik.errors.password}</p>
                </div>
                <input className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" type="submit" value='Update Restaurant Account'/>
            </form>
        </div>
    )
}
export default ManageRestaurantEditForm