import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
  
    const navigate = useNavigate()
  
  
    useEffect(() => {
      fetch(`/965/${language}/items`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setMenu(data.menu_items)
          setAllergyList(data.allergies)
          setFilters([])
        });
    }, [language]);
  
    function handleSetLanguage(langAbbrev) {
      setLanguage(langAbbrev)
    }
  
    return (
        <div>
            <NavBar handleSetLanguage={handleSetLanguage} />
            <Routes>
                <Route 
                path = '/menu-display'
                element = {<MenuDisplay allergyList={allergyList} setIsDirect={setIsDirect} filters={filters} setFilters={setFilters} menu={menu} />}     
                />
                <Route 
                path = '/complete-order'
                element = {isDirect ? <CompleteOrderPage language={language} orderList={orderList} /> : <Navigate to='/user' />}     
                />
                <Route 
                path = '/item/:id'
                element = {isDirect ? <ItemDetailsPage setIsDirect={setIsDirect} setHasOrdered={setHasOrdered} filters={filters} items={menu} /> : <Navigate to='/user' />}     
                />
                <Route 
                path = '/order'
                element = {isDirect ? <OrderPage allergyList={allergyList} setFilters={setFilters} setIsDirect={setIsDirect} hasOrdered={hasOrdered} setHasOrdered={setHasOrdered} orderList={orderList} setOrderList={setOrderList} /> : <Navigate to='/user' />}     
                />
            </Routes>
        </div>
    )
}
export default User