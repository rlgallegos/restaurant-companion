import { useState } from "react"


function ManageItemEditAllergy({allergy}) {
    const [isIncluded, setIsIncluded] = useState(true)
    console.log(allergy.id, allergy.name)

    function handleClick() {
        setIsIncluded(!isIncluded)
    }


    return (
        <div onClick={handleClick} className={isIncluded ? "allergy-intact" : "allergy-removed"}>
            <p>{allergy.name}</p>
        </div>
    )
}
export default ManageItemEditAllergy