import { useState } from "react"


function ManageItemEditAllergy({allergy, itemAllergies, setItemAllergies}) {
    const tailwindCSSIntact = 'my-auto, bg-blue-100 border border-gray-900 card'
    const tailwindCSSRemoved = 'my-auto, border border-gray-900 card'

    const [isIncluded, setIsIncluded] = useState(true)

    function handleClick() {
        setIsIncluded(!isIncluded)
        if (itemAllergies.includes(allergy)) {
            setItemAllergies(itemAllergies.filter(itemAllergy=> itemAllergy != allergy))
        } else {
            setItemAllergies([...itemAllergies, allergy])
        }
        
    }


    return (
        <div onClick={handleClick} className={isIncluded ? tailwindCSSIntact : tailwindCSSRemoved}>
            <p>{allergy.name}</p>
        </div>
    )
}
export default ManageItemEditAllergy