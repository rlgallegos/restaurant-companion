import { useState } from "react"


function AllergySideBarElement({filters, setFilters, allergy}) {
    const [removed, setRemoved] = useState(false)

    function handleFilter(e) {
        let allergenID = parseInt(e.target.id)

        if (filters.includes(allergy)) {
            setFilters(filters.filter(allergy => allergy.id != allergenID))
        } else {
            setFilters([...filters, allergy])
        }
        setRemoved(!removed)
    }

    let formattedAllergy = allergy.name.split('')
    let titledLetter = [...formattedAllergy][0].toUpperCase()
    let newWord = [titledLetter, ...formattedAllergy.splice(1)].join('')

    return(
        <>
            <div className={removed ? 'allergy-removed' : 'allergy-intact'}>
                <p  id={allergy.id}onClick={handleFilter}>{newWord}</p>
            </div>
        </>
    )
}
export default AllergySideBarElement