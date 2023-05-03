import { useState } from "react"


function SingleItemDetail({selected_item, onPlaceOrder}) {
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
        return <li className="my-1 ml-4  text-m flex-grow text-gray-100" key={uniqueId}>{allergy.name}</li>
    })

    return (
        <div className="bg-blue-900 bg-opacity-90 rounded-md shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold flex-grow text-gray-100 my-auto" >{selected_item.name}</h1>
            <p className="my-3 ml-4  text-m flex-grow text-gray-100">{selected_item.description}</p>
            {selected_item.kosher? <p className="my-1 ml-4  text-m  text-gray-100">Kosher</p>: null}
            {selected_item.vegan? <p className="my-1 ml-4  text-m  text-gray-100">Vegan</p>: null}
            <h3 className="my-1 ml-4  text-m flex-grow text-gray-100">Allergies:</h3>
            <ul className="text-left">
                {allergy_list}
            </ul>
            <br />
            <label className="my-1 ml-4  text-l  text-gray-100">Notes:</label>
            <input className="p-1 text-center" type="text" value={notes} onChange={handleNotesChange} />

            <label className="my-1 ml-4  text-l  text-gray-100">Quantity:</label>
            <input type="number" value={quantity} onChange={handleQuantityChange} min='1' className="p-1 text-center"/>
            {error && <p>{error}</p>}
            <br />
            <br />
            <button className="my-1 ml-4 text-m flex-grow text-gray-100 border border-blue-400 rounded-md px-4 py-2 hover:bg-blue-400 hover:text-white transition-all duration-200 ease-in-out" onClick={handleClick}>Add to Order</button>
        </div>
    )
}
export default SingleItemDetail