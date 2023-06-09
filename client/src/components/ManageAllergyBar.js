import { useState } from 'react';

import ManageAllergyBarElement from './ManageAllergyBarElement';

function ManageAllergyBar({setAvailableAllergies, availableAllergies}) {
    const tailwindCSSTitle = "text-3xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSButton = "card my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"

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
        if (!formData) return
        let new_obj = {
            name: formData,
            removable: true
        }
        let new_obj2 = {
            name: formData,
            removable: false
        }
  

        const newVal = availableAllergies.some(allObj => {
            return ((allObj.name == formData) && (allObj.removable == true))

        })
        const newVal2 = availableAllergies.some(allObj => {
            return ((allObj.name == formData) && (allObj.removable == false))
        })
        if (!newVal) {
            setAvailableAllergies((availableAllergies) => [...availableAllergies, new_obj])
        }
        if (!newVal2) {
            setAvailableAllergies((availableAllergies) => [...availableAllergies, new_obj2])
        }
        setFormData('')
    }

    return (
        <div>
            <h1 className={tailwindCSSTitle}>Currently Available Allergies:</h1>
            <div className="mt-4 grid grid-cols-4 md:grid-cols-5 justify-items-center gap-0 mb-4">
                {availableAllergies && availableAllergyList}
            </div>
            <div className={' bg-opacity-80 rounded-md bg-gray-100 w-4/5 md:w-1/3 p-12 mx-auto'}>
                <form onSubmit={handleSubmit}>
                    <label className={tailwindCSSSubTitle}>Custom Allergy:</label>
                    <input className={tailwindCSSInput} type='text' value={formData} onChange={handleChange} placeholder='Enter allergy' />  
                    <input className={tailwindCSSButton} type='submit' value="Add Allergy Option" />
                </form>
            </div>
        </div>

    )
}
export default ManageAllergyBar