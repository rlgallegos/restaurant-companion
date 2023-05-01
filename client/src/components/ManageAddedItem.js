import { useEffect, useState } from "react"


function ManageAddedItem({ setRestaurant, newItem, availableAllergies, setAvailableAllergies, restaurant}) {
    const [allergyList, setAllergyList] = useState([])
    const [currentAllergies, setCurrentAllergies] = useState([])
    const [specAvailableAllergies, setSpecAvailableAllergies] = useState([])

    useEffect(() => {
        setSpecAvailableAllergies(availableAllergies)
    }, [])

    console.log('allergies available to this specific item')
    console.log(availableAllergies)
    

    //This fetch is to add the allergies to a given MenuItem

    function handleApplyChanges(e) {
        console.log(e.target)
        e.target.disabled = true
        setTimeout(() => {
            e.target.disabled = false
        }, 5000)

        fetch(`/restaurants/${restaurant.id}/items/${newItem.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(allergyList)
        }).then(res => {
            if (res.ok) {
                res.json().then(data => {

                setAllergyList([])
                setCurrentAllergies(data)

                // IMPORTANT NOTE, the fetch returns a COMPLETE LIST OF ALLERGIES for this menu_item
    
                const updateIndex = restaurant.menu_items.findIndex(item => {
                    return item.id === newItem.id
                })

                //restricting duplicate submissions
                let nameList = []
                data.forEach(allergyObj => {
                    nameList.push(allergyObj.name)
                })

                //remove options to another one
                setSpecAvailableAllergies(specAvailableAllergies => {
                    return specAvailableAllergies.filter(allergy => {
                        return !nameList.includes(allergy.name)
                    })
                })


                const newMenuItem = {...restaurant.menu_items[updateIndex], allergies: data}
                const newItemsArray = [...restaurant.menu_items]
                newItemsArray.splice(updateIndex, 1, newMenuItem)
                //Updating Restaurant Frontend
                setRestaurant(restaurant => {
                    return {...restaurant, menu_items: restaurant.menu_items = newItemsArray}
                })
                    })
                }
            })
    }

    function handleAddAllergyToList(e) {
        e.preventDefault()
        //find the correct object
        let dataList = e.target[0].value.split('-')
        let foundObj = specAvailableAllergies.find(allergy => {
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
        let listOfUnacceptableNames = []
        currentAllergies.forEach(allergy => 
            listOfUnacceptableNames.push(allergy.name)
        )

        //This checks to make sure the allergy its available and also that its not already applied menu item
        if (!allergyList.includes(foundObj) & !listOfUnacceptableNames.includes(foundObj['name'])) {
            setAllergyList([...allergyList, foundObj])
        }
    }
    console.log('this is the allergyList')
    console.log(allergyList)

    let allergyOptions = []
    let uniqueId = 0
    if (specAvailableAllergies) {
        allergyOptions = specAvailableAllergies.map(allergy => {
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

    let currentAllergiesList = []
    if (currentAllergies) {
        currentAllergiesList = currentAllergies.map(allergy => {
            return <li key={allergy.id}>{allergy.name}</li>
        })
    }


    return(
        <div className="menu-card">
            <h3>{newItem.name}</h3>
            <p>{newItem.description}</p>
            {newItem.kosher && <p>This item is kosher</p>}
            {newItem.vegan && <p>This item is vegan</p>}
            <br />
            <h3>Allergies to add:</h3>
            {allergyList && givenAllergies}
            <br /><br />
            

            <form onSubmit={handleAddAllergyToList}>
                <select>
                    <option disabled>Select allergy to add</option>
                    {specAvailableAllergies && allergyOptions}
                </select>
                <input type="submit" value="Add Allergy" />
            </form>
            {allergyList && <button onClick={handleApplyChanges}>Apply Changes</button>}
            <br /><br />
            <h3>Allergies currently applied to this dish:</h3>
            <ul>
                {currentAllergies && currentAllergiesList}
            </ul>
        </div>
    )
}
export default ManageAddedItem