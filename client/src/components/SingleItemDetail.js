import { useState } from "react"


function SingleItemDetail({selected_item, onPlaceOrder}) {
    const tailwindCSSCard = "bg-gray-100 bg-opacity-80 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col border border-transparent "
    const tailwindCSSTitle = "text-3xl font-bold flex-grow text-gray-700 my-auto"
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "my-1 ml-4  text-m flex-grow text-gray-600 text-center"
    const tailwindCSSButton = "my-1 ml-4 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSInput = "text-sm pl-2 h-8  text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center"


    const [quantity, setQuantity] = useState(1)
    const [notes, setNotes] = useState('')
    const [error, setError] = useState('')

    function handleQuantityChange(e) {
        let numVal = Number(e.target.value)
        setQuantity(numVal)
        setError('')
    }

    function handleNotesChange(e) {
        setNotes(e.target.value)
    }

    function handleClick() {
        if (quantity > 0 && Number.isInteger(quantity)) {
            onPlaceOrder(quantity, notes)
        } else {
            setError('Please enter a whole, valid number')
        }
    }

    let uniqueId = 0
    let allergy_list = selected_item.allergies.map(allergy=> {
        uniqueId++
        return <li className={tailwindCSSSP} key={uniqueId}>{allergy.name}</li>
    })

    return (
        <div className={tailwindCSSCard}>
            <h1 className={tailwindCSSTitle} >{selected_item.name}</h1>
            <p className={tailwindCSSSP}>{selected_item.description}</p>
            {selected_item.kosher? <p className={tailwindCSSSP}>Kosher</p>: null}
            {selected_item.vegan? <p className={tailwindCSSSP}>Vegan</p>: null}
            <h3 className={tailwindCSSSubTitle}>Allergies:</h3>
            <ul className="text-left">
                {allergy_list}
            </ul>
            <br />
            <label className={tailwindCSSSP}>Notes:</label>
            <input className={tailwindCSSInput} type="text" value={notes} onChange={handleNotesChange} />

            <label className={tailwindCSSSP}>Quantity:</label>
            <input type="number" value={quantity} onChange={handleQuantityChange} min='1' className={tailwindCSSInput}/>
            {error && <p>{error}</p>}
            <br />
            <br />
            <button className={tailwindCSSButton} onClick={handleClick}>Add to Order</button>
        </div>
    )
}
export default SingleItemDetail