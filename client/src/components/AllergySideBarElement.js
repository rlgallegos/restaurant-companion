import { useState } from "react"


function AllergySideBarElement({filters, setFilters, allergy}) {
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSButton2 = "my-1 ml-4 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"

    const tailwindRemoved = "w-full aspect-w-1 aspect-h-1 text-m text-gray-800 border border-gray-400 rounded-sm px-4 py-2 hover:bg-white transition-all duration-200 ease-in-out card"
    const tailwindIntact = " w-full aspect-w-1 aspect-h-1 text-m text-gray-800 bg-gray-100 bg-opacity-90 shadow-md border border-gray-400 rounded-sm px- py-2 hover:bg-gray-400 transition-all duration-200 ease-in-out card"

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
            <div className={removed ? tailwindRemoved : tailwindIntact} onClick={handleFilter}>
                <p  id={allergy.id}>{newWord}</p>
            </div>
        </>
    )
}
export default AllergySideBarElement