import MenuCards from './MenuCards';
import AllergySideBar from './AllergySideBar';
import { useEffect } from 'react';

function MenuDisplay( {nameAddress, menu, allergyList, filters, setFilters, setIsDirect} ) {

  useEffect(() => {
    setFilters([])
    setIsDirect(true)
  }, [])

  function handleNavigateAway(){
    window.open(nameAddress.restaurantAddress)
  }

    return (
        <div>
            <AllergySideBar allergyList={allergyList} setFilters={setFilters} filters={filters} />
            <div>
              <h1 className='text-gray-700 text-3xl font-bold my-3'>Menu for: {nameAddress.restaurantName}</h1>
            </div>
            <MenuCards filters={filters} menu={menu} />

            {nameAddress && <div className='flex flex-row gap-2' onClick={handleNavigateAway}>
                <p>Link to external menu:</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
            </div>}
        </div>
    )
}

export default MenuDisplay