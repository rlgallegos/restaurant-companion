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
        return <li key={uniqueId}>{allergy.name}</li>
    })

    return (
        <div>
            <h1>{selected_item.name}</h1>
            <p>{selected_item.description}</p>
            {selected_item.kosher? <p>Kosher</p>: null}
            {selected_item.vegan? <p>Vegan</p>: null}
            <h3>Allergies:</h3>
            {allergy_list}
            <br />
            <input type="text" value={notes} onChange={handleNotesChange} />
            <br />
            <input type="number" value={quantity} onChange={handleQuantityChange} min='1'/>
            {error && <p>{error}</p>}
            <br />
            <br />
            <button onClick={handleClick}>Add to Order</button>
        </div>
    )
}
export default SingleItemDetail