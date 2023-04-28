import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from "yup";

import ManageItemEditAllergy from './ManageItemEditAllergy';

function ManageItemEdit({menuItem}) {
    const [itemAllergies, setItemAllergies] = useState([])
    useEffect(() => {
        setItemAllergies(menuItem.allergies)
    }, [])
    useEffect(() => {
        formik.values.allergies = itemAllergies
    }, [])


    const [isEditing, setIsEditing] = useState(false)
    function handleClick() {
        setIsEditing(!isEditing)
    }

    //Formik Schema Logic
    const formSchema = yup.object().shape({
        name: yup.string().max(15).required('Please enter a valid name for the dish'),
        description: yup.string().max(100).required("Please enter a a valid description under 100 characters"),
        });

    // //Formik Logic
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            allergies: []
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            console.log(values)
            fetch(`/users/`, {
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

    // let newList = []
    // let uniqueId = 0
    // if (menuItem) {
    //     uniqueId -= 1
    //     newList = menuItem.allergies.map(allergy => {
    //         return <ManageItemEditAllergy key={uniqueId} allergy={allergy} />
    //     })
    // }

    let uniqueId = 0
    
    let newList = menuItem.allergies.map(allergy => {
        uniqueId = uniqueId - 1
        return <ManageItemEditAllergy key={uniqueId} allergy={allergy} />
    })

    // if (menuItem) {
    //     menuItem.allergies.forEach(allergy => {
    //         setItemAllergies([...itemAllergies, allergy.id])
    //     })
    // }
    console.log(formik.values)
    console.log(itemAllergies)




    return (
        <>
            {/* {isEditing && <form onSubmit={formik.handleSubmit}>
                <input type='text' name='username' value={formik.values.username} onChange={formik.handleChange} placeholder='Enter Username' />
                <br /><br />
                <label>Administrator</label>
                <input type='radio' name='role' value='administrator'onChange={formik.handleChange}/>
                <label>User</label>
                <input type='radio' name='role' value='user' onChange={formik.handleChange}/>
                <br />
                <input type="submit" />
            </form>} */}
            {newList}
            <button onClick={handleClick}>Edit</button>
        </>

    )
}
export default ManageItemEdit