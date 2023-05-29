import { Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuDisplay from './MenuDisplay';
import CompleteOrderPage from './CompleteOrderPage';
import ItemDetailsPage from './ItemDetailsPage';
import OrderPage from './OrderPage';
import NavBar from './NavBar';

function User() {

    const [menu, setMenu] = useState([])
    const [filters, setFilters] = useState([])
    const [orderList, setOrderList] = useState([])
    const [language, setLanguage] = useState('en')
    const [hasOrdered, setHasOrdered] = useState(false)
    const [isDirect, setIsDirect] = useState(false)
    const [allergyList, setAllergyList] = useState([])
    const [id, setID] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingTranslation, setIsLoadingTranslation] = useState(false)
    const [loadMessage, setLoadMessage] = useState('')
    const [classNames, setClassNames] = useState('')
    const [nameAddress, setNameAddress] = useState({restaurantName: null, restaurantAddress: null})
  
    const navigate = useNavigate()
    const params = useParams()
  
    useEffect(() => {
      setIsLoading(true)
      if (language !== 'en') {
        setIsLoadingTranslation(true)
      }
      fetch(`/${params.id}/${language}/items`)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false)
          setIsLoadingTranslation(false)
          setID(data.id)
          setMenu(data.menu_items)
          setAllergyList(data.allergies)
          setFilters([])
          setNameAddress({
            restaurantName: data.name,
            restaurantAddress: data.url
          })
        });
    }, [language]);
  
    function handleSetLanguage(langAbbrev) {
      setLanguage(langAbbrev)
      beginMessages()
    }


    const messageArray = ['Sending request...', 'Translating data...', 'Building menu...']

    function beginMessages(){
      setLoadMessage(() => 'Sending request...')
      setTimeout(() => {setLoadMessage('Translating data...')}, 8000)
      setTimeout(() => {setLoadMessage('Building menu...')}, 16000)
    }


    useEffect(() => {
      setClassNames('animate-fade-in')
      setTimeout(() => {setClassNames('animate-fade-out')}, 4000)
    }, [loadMessage])




    return (
      <>
        {!isLoadingTranslation ? <div>
            <NavBar handleSetLanguage={handleSetLanguage} />
            <Routes>
                <Route 
                path = '/menu-display'
                element = {<MenuDisplay nameAddress={nameAddress} allergyList={allergyList} setIsDirect={setIsDirect} filters={filters} setFilters={setFilters} menu={menu} />}     
                />
                <Route 
                path = '/complete-order'
                element = {isDirect ? <CompleteOrderPage restID={id} language={language} orderList={orderList} /> : <Navigate to='../menu-display' />}     
                />
                <Route 
                path = '/item/:id'
                element = {isDirect ? <ItemDetailsPage setIsDirect={setIsDirect} setHasOrdered={setHasOrdered} filters={filters} items={menu} /> : <Navigate to='../menu-display' />}     
                />
                <Route 
                path = '/order'
                element = {isDirect ? <OrderPage allergyList={allergyList} setFilters={setFilters} setIsDirect={setIsDirect} hasOrdered={hasOrdered} setHasOrdered={setHasOrdered} orderList={orderList} setOrderList={setOrderList} /> : <Navigate to='../menu-display' />}     
                />
            </Routes>
        </div> : 
        <div className='absolute top-0 left-0 w-full h-full z-40 bg-black'>
          <video loop src='/white-circle-loading.mp4' autoPlay playsInline muted className='absolute top-0 left-0 w-full h-full z-index-50'>Video not supported by browser</video>
          <p className={`text-lg md:text-3xl absolute mx-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-gray-100 ${classNames} duration-200`}>{loadMessage}</p>
        </div>}
        </>
    )
}
export default User