import { useState } from "react"


function ManageItemEditAllergy({allergy, itemAllergies, setItemAllergies}) {
    const tailwindRemoved = "flex-grow-0 w-full aspect-w-1 aspect-h-1 text-m text-gray-800 border border-gray-100 bg-gray-400 rounded-sm py-1 hover:bg-white transition-all duration-200 ease-in-out card"
    const tailwindIntact = "flex-grow-0 w-full aspect-w-1 aspect-h-1 text-m text-gray-800 bg-gray-100 bg-opacity-90 shadow-md border border-gray-400 rounded-sm py-1 hover:bg-gray-300 transition-all duration-200 ease-in-out card"

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
        <div onClick={handleClick} className={isIncluded ? tailwindIntact : tailwindRemoved}>
            <p>{allergy.name}</p>
        </div>
    )
}
export default ManageItemEditAllergy