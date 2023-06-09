import { useState } from "react"

import { useFormik } from 'formik';
import * as yup from "yup";

import ManageAddedItem from "./ManageAddedItem";
import ManageAllergyBar from "./ManageAllergyBar";

function ManageAddItemForm({restaurant, setRestaurant, availableAllergies, setAvailableAllergies}) {
    const tailwindCSSSP = "ml-2 my-2 text-m flex-grow text-gray-600 text-center md:text-left"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"
    const tailwindCSSButton = "card my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSTitle = "text-2xl font-bold flex-grow text-gray-700 my-4"

    const [newItems, setNewItems] = useState([])

    //This Fetch is to add the MenuItem to the database

    //Formik Schema Logic
    const formSchema = yup.object().shape({
        name: yup.string().max(50).required('Please enter a valid name for the dish'),
        description: yup.string().max(100).required("Please enter a a valid description under 100 characters"),
        });

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
            return <ManageAddedItem key={newItem.id} setRestaurant={setRestaurant} restaurant={restaurant} availableAllergies={availableAllergies} newItem={newItem} />
        })
    }

    return (
        <div >
            <form className=' rounded-md bg-gray-100 bg-opacity-80 w-5/6 md:w-1/3 my-10 md:mt-20 mx-auto p-12' onSubmit={formik.handleSubmit}>
                <h1 className={tailwindCSSTitle}>Add Dish</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center">
                    <label className={tailwindCSSSP}>Dish Name: </label>
                    <input className={tailwindCSSInput} type='text' name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Name' />
                    <p style={{color: "red"}}>{formik.errors.name}</p>
                    <br />
                    <label className={tailwindCSSSP}>Dish Description: </label>
                    <input className={tailwindCSSInput} type="textarea" name='description' value={formik.values.description} onChange={formik.handleChange} placeholder='Description' />
                    <p style={{color: "red"}}>{formik.errors.description}</p>
                    <br />
                </div>
                <label className={tailwindCSSSP}>Vegan</label>
                <input type="checkbox" checked={formik.values.vegan} name="vegan" value={formik.values.vegan} onChange={formik.handleChange} />
                <br />
                <label className={tailwindCSSSP}>Kosher</label>
                <input type="checkbox" checked={formik.values.kosher} name="kosher" value={formik.values.kosher} onChange={formik.handleChange}/>
                <br />
                <br />
                <input className={tailwindCSSButton} type="submit" value='Add Item'/>
            </form>
            <div className="flex justify-center flex-col md:flex-row flex-wrap gap-2 mx-2">
                {newItems ? newItemList : <p>No new items added yet...</p>}
            </div>
            {newItems ? <ManageAllergyBar setAvailableAllergies={setAvailableAllergies} availableAllergies={availableAllergies} /> : <p>No allergies listed yet for this restaurant</p>}
        </div>
    )
}
export default ManageAddItemForm