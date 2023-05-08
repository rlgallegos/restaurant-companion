import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from "yup";

import ManageItemEditAllergy from './ManageItemEditAllergy';

function ManageItemEdit({menuItem, onUpdateItem}) {
    const tailwindCSSButton = "flex-grow-0 my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSSP = "mx-2 my-4 md:my-2 text-m flex-grow text-gray-600 text-center"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"


    const [itemAllergies, setItemAllergies] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    const [isEditing, setIsEditing] = useState(false)
    function handleClick() {
        setIsEditing(!isEditing)
    }

    //Fetch to Edit the attributes of a MenuItem, including allergies
    //Formik Schema Logic
    const formSchema = yup.object().shape({
        name: yup.string().max(50),
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
            setIsLoading(true)

            formik.values.allergies = itemAllergies
            fetch(`/restaurants/${menuItem.restaurant_id}/items/${menuItem.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            }).then(res => res.json())
            .then(data => {
                setItemAllergies([])
                setIsLoading(false)
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
            <button className={tailwindCSSButton} onClick={handleClick}>{!isEditing ? 'Expand Edit Menu' : 'Close Edit Menu'}</button>
            {isEditing && 
            <form className='my-4' onSubmit={formik.handleSubmit}>
                <label className={tailwindCSSSP}>Dish Name: </label>
                <input className={tailwindCSSInput} type='text' name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Name' />
                <br />
                <label className={tailwindCSSSP}>Description: </label>
                <input className={tailwindCSSInput} type="textarea" name='description' value={formik.values.description} onChange={formik.handleChange} placeholder='Description' />
                <br />
                <label className={tailwindCSSSP}>Vegan</label>
                <input type="checkbox" checked={formik.values.vegan} name="vegan" value={formik.values.vegan} onChange={formik.handleChange} />
                <br />
                <label className={tailwindCSSSP}>Kosher</label>
                <input type="checkbox" checked={formik.values.kosher} name="kosher" value={formik.values.kosher} onChange={formik.handleChange}/>
                <br />
                <br />
                <label className={tailwindCSSSP}>Allergies:</label>
                <div className='my-2'>
                {newList}
                </div>
                {isLoading ? <p className={tailwindCSSSP} >Updating...</p> : <input className={tailwindCSSButton} type="submit" value='Update Dish'/>}
            </form>}
        </>
    )
}
export default ManageItemEdit