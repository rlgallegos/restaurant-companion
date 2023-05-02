import MenuCards from './MenuCards';
import AllergySideBar from './AllergySideBar';
import { useEffect } from 'react';

function MenuDisplay( {menu, allergyList, filters, setFilters, setIsDirect} ) {

  useEffect(() => {
    setIsDirect(true)
  }, [])

    return (
        <div>
            <AllergySideBar allergyList={allergyList} setFilters={setFilters} filters={filters} />
            <h1 className='text-gray-700 text-xl font-bold'>Menu</h1>
            <MenuCards filters={filters} menu={menu} />
        </div>
    )
}

export default MenuDisplay