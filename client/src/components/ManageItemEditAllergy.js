import { useState } from "react"


function ManageItemEditAllergy({allergy, itemAllergies, setItemAllergies}) {
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
        <div onClick={handleClick} className={isIncluded ? "allergy-intact" : "allergy-removed"}>
            <p>{allergy.name}</p>
        </div>
    )
}
export default ManageItemEditAllergy