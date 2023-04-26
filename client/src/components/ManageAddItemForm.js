import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";

import ManageAddedItem from "./ManaageAddedItem";
import ManageAllergyBar from "./ManageAllergyBar";

function ManageAddItemForm() {
    const [availableAllergies, setAvailableAllergies] = useState([])
    const [newItems, setNewItems] = useState([])
    const navigate = useNavigate()
    const params = useParams()

    //Check logged in
    useEffect(() => {
        fetch('/check_session')
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                navigate('/manage')
            }
        })
        .then(data => {
            if (data.restaurant.allergies) {
                setAvailableAllergies(data.restaurant.allergies)
            }
        })
    }, [])

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
            console.log(params.id)
            fetch(`/restaurants/${params.id}/items`, {
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
                    })
                }
            })
        }
    })
    let newItemList = []
    if (newItems) {
        newItemList = newItems.map(newItem => {
            return <ManageAddedItem key={newItem.id} setAvailableAllergies={setAvailableAllergies} availableAllergies={availableAllergies} newItem={newItem} />
        })
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} placeholder='Name' />
                <p style={{color: "red"}}>{formik.errors.name}</p>
                <br />
                <input type="textarea" name='description' value={formik.values.description} onChange={formik.handleChange} placeholder='Description' />
                <p style={{color: "red"}}>{formik.errors.description}</p>
                <br />
                <input type="checkbox" checked={formik.values.vegan} name="vegan" value={formik.values.vegan} onChange={formik.handleChange} />
                <br />
                <input type="checkbox" checked={formik.values.kosher} name="kosher" value={formik.values.kosher} onChange={formik.handleChange}/>
                <br />
                <br />
                <input type="submit" value='Add Item'/>
            </form>
            {newItems ? newItemList : <p>No new items added yet...</p>}
            {newItems ? <ManageAllergyBar restID={params.id} setAvailableAllergies={setAvailableAllergies} availableAllergies={availableAllergies} /> : <p>No allergies listed yet for this restaurant</p>}
        </div>
    )
}
export default ManageAddItemForm