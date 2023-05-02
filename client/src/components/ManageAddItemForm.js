import { useEffect, useState } from "react"
import { useFormik } from 'formik';
import * as yup from "yup";

import ManageAddedItem from "./ManageAddedItem";
import ManageAllergyBar from "./ManageAllergyBar";

function ManageAddItemForm({restaurant, setRestaurant, availableAllergies, setAvailableAllergies}) {
    const tailwindCSS = "m-auto mr-2 mb-2 md:mb-auto md:ml-4 text-lg flex-grow text-gray-900 "
    const tailwindCSS2 = "text-sm pl-2 h-8  flex-grow text-gray-900"

    const [newItems, setNewItems] = useState([])


    //This Fetch is to add the MenuItem to the database

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
            kosher: false,
            vegan: false
        },
        validationSchema: formSchema,
        validateOnChange: false,
        onSubmit: values => {
            fetch(`/restaurants/${restaurant.id}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formik.values)
            }).then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setNewItems([...newItems, data])
                        formik.resetForm()
                        setRestaurant({...restaurant, menu_items: [...restaurant.menu_items, data]})
                    })
                }
            })
        }
    })
    let newItemList = []
    if (newItems) {
        newItemList = newItems.map(newItem => {
            return <ManageAddedItem key={newItem.id} setRestaurant={setRestaurant} restaurant={restaurant} availableAllergies={availableAllergies} setAvailableAllergies={setAvailableAllergies} newItem={newItem} />
        })
    }


    return (
        <div >
            <form className='border border-blue-900 rounded-md bg-blue-800 bg-opacity-50 w-4/5 md:w-1/3 my-10 md:mt-20 mx-auto p-12' onSubmit={formik.handleSubmit}>
                <label className={tailwindCSS}>Dish Name: </label>
                <input className={tailwindCSS2} type='text' name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Name' />
                <p style={{color: "red"}}>{formik.errors.name}</p>
                <br />
                <label className={tailwindCSS}>Description: </label>
                <input className={tailwindCSS2} type="textarea" name='description' value={formik.values.description} onChange={formik.handleChange} placeholder='Description' />
                <p style={{color: "red"}}>{formik.errors.description}</p>
                <br />
                <label className={tailwindCSS}>Vegan</label>
                <input type="checkbox" checked={formik.values.vegan} name="vegan" value={formik.values.vegan} onChange={formik.handleChange} />
                <br />
                <label className={tailwindCSS}>Kosher</label>
                <input type="checkbox" checked={formik.values.kosher} name="kosher" value={formik.values.kosher} onChange={formik.handleChange}/>
                <br />
                <br />
                <input className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-900 border border-blue-400 bg-blue-900 bg-opacity-50 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" type="submit" value='Add Item'/>
            </form>
            <div className="flex justify-center flex-col md:flex-row flex-wrap gap-2 mx-2">
                {newItems ? newItemList : <p>No new items added yet...</p>}
            </div>
            {newItems ? <ManageAllergyBar restID={restaurant.id} setAvailableAllergies={setAvailableAllergies} availableAllergies={availableAllergies} /> : <p>No allergies listed yet for this restaurant</p>}
        </div>
    )
}
export default ManageAddItemForm