import MenuCards from './MenuCards';
import AllergySideBar from './AllergySideBar';

function MenuDisplay( {menu, filters, setFilters} ) {

    function handleSubmit(e) {
        e.preventDefault()
        setFilters([...filters, e.target[0].value.toLowerCase()])
    }

    return (
        <div>
            <AllergySideBar setFilters={setFilters} filters={filters} />
            <form onSubmit={handleSubmit}>
                <input type='text' />
                <input type='submit' />
            </form>
            <h1>Menu</h1>
            <MenuCards filters={filters} menu={menu} />
        </div>
    )
}

export default MenuDisplay