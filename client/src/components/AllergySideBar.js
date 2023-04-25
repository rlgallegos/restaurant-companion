import AllergySideBarElement from "./AllergySideBarElement"

function AllergySideBar({ allergyList, filters, setFilters}) {

    let uniqueId = 0
    const allergySidebarList = allergyList.map(allergy => {
        uniqueId++
        return <AllergySideBarElement key={uniqueId} filters={filters} setFilters={setFilters} allergy={allergy} />
    })

    return (
        <div id="allergy-side-bar">
            Allergy side bar
            {allergyList && allergySidebarList}
        </div>
    )
}
export default AllergySideBar