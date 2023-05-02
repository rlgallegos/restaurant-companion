import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from "yup";

import ManageItemEditAllergy from './ManageItemEditAllergy';

function ManageItemEdit({menuItem, onUpdateItem}) {
    const [itemAllergies, setItemAllergies] = useState([])


    const [isEditing, setIsEditing] = useState(false)
    function handleClick() {
        setIsEditing(!isEditing)
    }

    //Fetch to Edit the attributes of a MenuItem
    //Formik Schema Logic
    const formSchema = yup.object().shape({
        name: yup.string().max(15),
        description: yup.string().max(100)
        });

    // //Formik Logic
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            kosher: false,
            vegan: false,
            allergies: []
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            formik.values.allergies = itemAllergies
            fetch(`/restaurants/${menuItem.restaurant_id}/items/${menuItem.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => res.json())
            .then(data => {
                setItemAllergies([])
                onUpdateItem(data)
                formik.resetForm()
            })
        }
    })


    let newList = menuItem.allergies.map(allergy => {
        return <ManageItemEditAllergy key={allergy.id} itemAllergies={itemAllergies} setItemAllergies={setItemAllergies} allergy={allergy} />
    })

    return (
        <>
            {isEditing && 
            <form  onSubmit={formik.handleSubmit}>
                <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Name' />
            
                <br />
                <input type="textarea" name='description' value={formik.values.description} onChange={formik.handleChange} placeholder='Description' />

                <br />
                <label>Vegan</label>
                <input type="checkbox" checked={formik.values.vegan} name="vegan" value={formik.values.vegan} onChange={formik.handleChange} />
                <br />
                <label>Kosher</label>
                <input type="checkbox" checked={formik.values.kosher} name="kosher" value={formik.values.kosher} onChange={formik.handleChange}/>
                <br />
                <br />
                <input type="submit" value='Update Dish'/>
            </form>}
            {isEditing && newList}
            <button onClick={handleClick}>Edit</button>
        </>

    )
}
export default ManageItemEdit