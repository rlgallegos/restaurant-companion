import { useState } from "react"
import { useParams } from "react-router-dom"


function ManageAddedItem({newItem, availableAllergies, setAvailableAllergies}) {
    const [allergyList, setAllergyList] = useState([])
    const params = useParams()

    // An Import note for me in the future:
    // Currently the allergies that exist for a restaurant are held in state,
    // Given that they are a property set exclusively when an associated menuItem
    // has them, it makes them impossible to create for a given restaurant,
    // and thus ill-advised to post the database until the moment
    // an associated menuItem is committed to the database
    
    // This means the logic in the  MenuAllergyBar component is good for copying,
    // but will need to be transferred here
    
    function handleApplyChanges() {
        fetch(`/restaurants/${params.id}/items/${newItem.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(allergyList)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setAllergyList(data)
        })
    }

    function handleAddAllergyToList(e) {
        e.preventDefault()
        //find the correct object
        console.log(e.target[0].value)
        let dataList = e.target[0].value.split('-')
        console.log(dataList)
        let foundObj = availableAllergies.find(allergy => {
            if (allergy.name == dataList[0]) {
                if (allergy.removable && dataList[1] == 'removable'){
                    return true
                } else if (!allergy.removable && dataList[1] == 'not'){
                    return true
                } else {
                    return false
                }
            }
        })
        if (!allergyList.includes(foundObj)) {
            setAllergyList([...allergyList, foundObj])
        }
    }

    let allergyOptions = []
    let uniqueId = 0
    if (availableAllergies) {
        allergyOptions = availableAllergies.map(allergy => {
            uniqueId++
            return <option key={uniqueId} value={allergy.removable ? (allergy.name + '-removable') : allergy.name + '-not'}>{allergy.removable ? (allergy.name + '- (removable)') : allergy.name + '- (not removable)'}</option>
        })
    }
    let givenAllergies = []
    let uniqueId2 = 0
    if (allergyList) {
        givenAllergies = allergyList.map(allergy => {
            uniqueId2++
            return <li key={uniqueId2}>{allergy.removable ? (allergy.name + '- (removable)') : allergy.name + '- (not removable)'}</li>
        })
    }


    return(
        <div className="menu-card">
            <h3>{newItem.name}</h3>
            <p>{newItem.description}</p>
            {newItem.kosher && <p>This item is kosher</p>}
            {newItem.vegan && <p>This item is vegan</p>}
            <br />
            {allergyList && givenAllergies}
            <br /><br />

            <form onSubmit={handleAddAllergyToList}>
                <select>
                    <option disabled>Select allergy to add</option>
                    {availableAllergies && allergyOptions}
                </select>
                <input type="submit" value="Add Allergy" />
            </form>

            {allergyList && <button onClick={handleApplyChanges}>Apply Changes</button>}
        </div>
    )
}
export default ManageAddedItem