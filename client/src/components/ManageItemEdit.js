import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from "yup";

import ManageItemEditAllergy from './ManageItemEditAllergy';

function ManageItemEdit({menuItem, onUpdateItem}) {
    const tailwindCSS = "m-auto mr-2 mb-2 md:mb-auto md:ml-4 text-lg flex-grow text-gray-100 "
    const tailwindCSS2 = "text-sm pl-2 h-8  flex-grow text-gray-900 text-gray-100 text-gray-100 my-2 w-full sm:w-3/4"

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
            <button className="my-1 ml-4 text-m text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={handleClick}>{!isEditing ? 'Expand Edit Menu' : 'Close Edit Menu'}</button>
            {isEditing && 
            <form onSubmit={formik.handleSubmit}>
                <label className={tailwindCSS}>Dish Name: </label>
                <input className={tailwindCSS2} type='text' name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Name' />
                <br />
                <label className={tailwindCSS}>Description: </label>
                <input className={tailwindCSS2} type="textarea" name='description' value={formik.values.description} onChange={formik.handleChange} placeholder='Description' />
                <br />
                <label className={tailwindCSS}>Vegan</label>
                <input type="checkbox" checked={formik.values.vegan} name="vegan" value={formik.values.vegan} onChange={formik.handleChange} />
                <br />
                <label className={tailwindCSS}>Kosher</label>
                <input type="checkbox" checked={formik.values.kosher} name="kosher" value={formik.values.kosher} onChange={formik.handleChange}/>
                <br />
                <br />
                {newList}
                {isLoading ? <p className={tailwindCSS} >Updating...</p> : <input className="my-1 ml-4 text-m text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out card" type="submit" value='Update Dish'/>}
            </form>}
            {/* {isEditing && newList} */}
        </>

    )
}
export default ManageItemEdit