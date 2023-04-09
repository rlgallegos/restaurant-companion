// import logo from '../logo.svg';
import '../App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuDisplay from './MenuDisplay';
import FilterPage from './FilterPage';
import ItemDetailsPage from './ItemDetailsPage';
import OrderPage from './OrderPage';
import ManageMenu from './ManageMenu';
import Welcome from './Welcome';
import { useNavigate } from "react-router-dom";

import NavBar from './NavBar';



function App() {
  const [menu, setMenu] = useState([])
  const [filters, setFilters] = useState([])
  const [orderList, setOrderList] = useState([])
  const [language, setLanguage] = useState('en')
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!language) {
  //     navigate('/welcome')
  //   }

  // }, [])

  useEffect(() => {
    fetch(`/447/${language}/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMenu(data)
      });
  }, [language]);

  function handleSetLanguage(langAbbrev) {
    setLanguage(langAbbrev)
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Example Name</h1>
      </header>
      <main>
        <NavBar handleSetLanguage={handleSetLanguage} />
        <Routes>
          {/* <Route 
          path = '/welcome'
          element = {<Welcome onSetLanguage={handleSetLanguage}/>}     
          /> */}
          <Route 
          path = '/'
          element = {<MenuDisplay filters={filters} setFilters={setFilters} menu={menu} />}     
          />
          <Route 
          path = '/filter'
          element = {<FilterPage />}     
          />
          <Route 
          path = '/item/:id'
          element = {<ItemDetailsPage filters={filters} items={menu} />}     
          />
          <Route 
          path = '/order'
          element = {<OrderPage orderList={orderList} setOrderList={setOrderList} />}     
          />
          {/* <Route 
          path = '/manage/:name/items'
          element = {<ManageMenu items={items} />}     
          /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
