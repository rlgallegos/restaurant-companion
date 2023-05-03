import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from "yup";
import ManageAllergyBarElement from './ManageAllergyBarElement';

function ManageAllergyrBar({setAvailableAllergies, restID, availableAllergies}) {
    const tailwindCSS = "m-auto md:mr-2 mb-2 md:mb-auto md:ml-4 text-lg flex-grow text-gray-100 "
    const tailwindCSS2 = "text-sm pl-2 h-8  flex-grow text-gray-100"

    const [formData, setFormData] = useState('')

    let availableAllergyList = []
    let uniqueId = 0
    
    if (availableAllergies) {
        availableAllergyList = availableAllergies.map(allergy => {
            uniqueId++
            return <ManageAllergyBarElement key={uniqueId} allergy={allergy} />
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
            return allObj.name == formData
        })
        if (!newVal) {
            setAvailableAllergies([...availableAllergies, new_obj, new_obj2])
            setFormData('')
        }
    }




    return (
        <div>
            <h1 className='text-3xl '>Currently Available Allergies:</h1>
            <div className="mt-4 grid grid-cols-4 md:grid-cols-5 justify-items-center gap-0 mb-4">
                {availableAllergies && availableAllergyList}
            </div>
            <div className='border border-blue-900 bg-opacity-90 rounded-md bg-blue-900 w-4/5 md:w-1/3 p-12 mx-auto'>
                <form onSubmit={handleSubmit}>
                    <label className={tailwindCSS}>Custom Allergy:</label>
                    <input className={tailwindCSS2} type='text' value={formData} onChange={handleChange} />
                    
                    <input className="m-auto sm:m-4 my-8 text-m flex-grow text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" type='submit' value="Add Allergy Option" />
                </form>
            </div>
        </div>

    )
}
export default ManageAllergyrBar