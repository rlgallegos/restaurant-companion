import { useFormik } from 'formik';
import * as yup from "yup";


function ManageLogin() {

    // //Formik Schema Logic
    // const formSchema = yup.object().shape({
    //     hourly_wage: yup
    //     .number()
    //     .positive()
    //     .integer()
    //     .required("Must enter a new value")
    //     .typeError("Please enter a valid number")
    //     });

    // //Formik Logic
    // const formik = useFormik({
    //     initialValues: {
    //         hourly_wage: '' 
    //     },
    //     validationSchema: formSchema,
    //     validateOnChange: false,
    //     onSubmit: values => {
    //         console.log(values)
    //         fetch(`/income/${userID}`, {
    //             method: "PATCH",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(values)
    //         })
    //         .then(() => {
    //             console.log('reached here')
    //             navigate('/profile')
    //         })
    //     }
    // })



    return (
        <p>The Login Form</p>
    )
}
export default ManageLogin