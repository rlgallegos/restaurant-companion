

function AllergySideBar({ filters, setFilters}) {

    //Allergy entry deletion
    function handleClick(e) {
        console.log(e.target.textContent)
        setFilters(filters.filter(filter => filter != e.target.textContent))
    }
    //Allergy list creation
    let uniqueId = 0
    const allergy_list = filters.map(filter => {
        uniqueId++
        return <p onClick={handleClick} key={uniqueId}>{filter}</p>
    })

    return (
        <div id="allergy-side-bar">
            Allergy side bar
            {allergy_list}
        </div>
    )
}
export default AllergySideBar