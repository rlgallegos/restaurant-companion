import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from "yup";

function ManageAllergyrBar({setAvailableAllergies, restID, availableAllergies}) {

    const [formData, setFormData] = useState('')

    let availableAllergyList = []
    let uniqueId = 0
    if (availableAllergies) {
        availableAllergyList = availableAllergies.map(allergy => {
            uniqueId++
            return <li key={uniqueId}>{allergy.removable ? (allergy.name + '- (removable)') : allergy.name + '- (not removable)'}</li>
        })
    }

    function handleChange(e){
        setFormData(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        let new_obj = {
            name: formData,
            removable: true
        }
        let new_obj2 = {
            name: formData,
            removable: false
        }

        const newVal = availableAllergies.some(allObj => {
            // console.log(allObj)
            return allObj.name == formData
        })

        if (!newVal) {
            setAvailableAllergies([...availableAllergies, new_obj, new_obj2])
        }
    }




    return (
        <div>
            <div>
                {availableAllergies && availableAllergyList}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' value={formData} onChange={handleChange} />
                    <br /><br />
                    <input type='submit' value="Add Custom Allergy Option" />
                </form>
            </div>
        </div>

    )
}
export default ManageAllergyrBar