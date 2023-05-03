import { useState } from "react"


function AllergySideBarElement({filters, setFilters, allergy}) {

    const tailwindRemoved = "w-full aspect-w-1 aspect-h-1 bg-blue-400 text-m text-gray-100 border border-blue-400 rounded-sm px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out card"
    const tailwindIntact = " w-full aspect-w-1 aspect-h-1 text-m text-gray-900 border border-blue-400 rounded-sm px- py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out card"

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
            <div className={removed ? tailwindRemoved : tailwindIntact}>
                <p  id={allergy.id}onClick={handleFilter}>{newWord}</p>
            </div>
        </>
    )
}
export default AllergySideBarElement