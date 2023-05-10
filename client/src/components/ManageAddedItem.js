import { useEffect, useState } from "react"


function ManageAddedItem({ setRestaurant, newItem, availableAllergies, setAvailableAllergies, restaurant}) {

    const tailwindCSSCard = "bg-gray-100 bg-opacity-80 rounded-md shadow-md sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-12 mx-10 my-10 flex flex-col border border-transparent "
    const tailwindCSSTitle = "flex-grow-0 text-3xl font-bold text-gray-700 my-4 mx-auto text-center"
    const tailwindCSSSubTitle = "text-xl font-bold flex-grow text-gray-700 my-4"
    const tailwindCSSSP = "flex-grow-0 ml-2 my-4 md:my-2 text-m flex-grow text-gray-600 text-center"
    const tailwindCSSButton = "card flex-grow-0 my-1 text-m flex-grow text-gray-700 border border-gray-400 rounded-md px-4 py-2 hover:bg-gray-300 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSButton2 = "my-1 ml-4 text-m flex-grow text-gray-800 border border-gray-100 rounded-md px-4 py-2 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105"
    const tailwindCSSInput = "text-sm h-8 pl-0 md:pl-2 text-gray-900 text-gray-100 text-gray-100 my-2 w-full text-center md:text-left"
    const tailwindCSSSListItem = "my-2 text-m flex-grow text-gray-600 text-center"


    

    const tailwindCSS2 = "text-sm pl-2 h-8  flex-grow text-gray-100"


    const [allergyList, setAllergyList] = useState([])
    const [currentAllergies, setCurrentAllergies] = useState([])
    const [specAvailableAllergies, setSpecAvailableAllergies] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setSpecAvailableAllergies(availableAllergies)
    }, [availableAllergies])


    

    //This fetch is to add the allergies to a given MenuItem

    function handleApplyChanges() {
        setIsLoading(true)

        fetch(`/restaurants/${restaurant.id}/items/${newItem.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(allergyList)
        }).then(res => {
            if (res.ok) {
                setIsLoading(false)
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
    console.log(specAvailableAllergies)

    console.log('allergies available to this specific item')
    console.log(availableAllergies)


    let allergyOptions = []
    let uniqueId = 0
    if (specAvailableAllergies) {
        allergyOptions = specAvailableAllergies.map(allergy => {
            uniqueId++
            return <option className={tailwindCSSInput} key={uniqueId} value={allergy.removable ? (allergy.name + '-removable') : allergy.name + '-not'}>{allergy.removable ? (allergy.name + '- (removable)') : allergy.name + '- (not removable)'}</option>
        })
    }
    let givenAllergies = []
    let uniqueId2 = 0
    if (allergyList) {
        givenAllergies = allergyList.map(allergy => {
            uniqueId2++
            return <li className={tailwindCSSSListItem} key={uniqueId2}>{allergy.removable ? (allergy.name + '- (removable)') : allergy.name + '- (not removable)'}</li>
        })
    }

    let currentAllergiesList = []
    if (currentAllergies) {
        currentAllergiesList = currentAllergies.map(allergy => {
            return <li className={tailwindCSSSListItem} key={allergy.id}>{allergy.name}</li>
        })
    }


    return(
        <div className='shadow-md bg-opacity-90 rounded-md bg-gray-100 my-10 mx-auto md:mx-6 p-12 '>
            
            <div className="w-4/5 sm:2/3 flex justify-center items-center text-center mx-auto" >
                <h3 className={tailwindCSSTitle}>{newItem.name}</h3>
            </div>
            
            <p className={tailwindCSSSP}>{newItem.description}</p>
            {newItem.kosher && <p className={tailwindCSSSP}>This item is kosher</p>}
            {newItem.vegan && <p className={tailwindCSSSP}>This item is vegan</p>}
            <br />
            <h3 className={tailwindCSSSubTitle}>Allergies staged to be added:</h3>
            {allergyList && givenAllergies}
            <form className="p-4 border border-gray-200 my-2" onSubmit={handleAddAllergyToList}>
                <select className="mx-2">
                    <option className={tailwindCSSInput} disabled>Select allergy to add</option>
                    {allergyOptions && allergyOptions}
                </select>
                <input className={tailwindCSSButton} type="submit" value="Add Allergy" />
            </form>
            {allergyList && !isLoading ? <button className={tailwindCSSButton} onClick={handleApplyChanges}>Apply Changes</button> : <p className={tailwindCSSSP}>Loading...</p>}
            <br /><br />
            <h3 className={tailwindCSSSubTitle}>Allergies now applied to this dish:</h3>
            <ul>
                {currentAllergies && currentAllergiesList}
            </ul>
        </div>
    )
}
export default ManageAddedItem