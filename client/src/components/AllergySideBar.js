import AllergySideBarElement from "./AllergySideBarElement"

function AllergySideBar({ allergyList, filters, setFilters}) {

    let uniqueId = 0
    const allergySidebarList = allergyList.map(allergy => {
        uniqueId++
        return <AllergySideBarElement key={uniqueId} filters={filters} setFilters={setFilters} allergy={allergy} />
    })

    return (
        <>
        <h3 className="my-4 text-lg">Click/Tap to Filter:</h3>
        <div className="grid grid-cols-4 md:grid-cols-5 justify-items-center gap-0 mb-4">
            {allergyList && allergySidebarList}
        </div>
        </>
    )
}
export default AllergySideBar