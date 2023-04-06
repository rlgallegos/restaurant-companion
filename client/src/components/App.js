// import logo from '../logo.svg';
import '../App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuDisplay from './MenuDisplay';
import FilterPage from './FilterPage';
import ItemDetailsPage from './ItemDetailsPage';
import OrderPage from './OrderPage';

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data)
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Header</h1>
      </header>
      <main>
        <Routes>
          <Route 
          path = '/'
          element = {<MenuDisplay items={items} />}     
          />
          <Route 
          path = '/filter'
          element = {<FilterPage />}     
          />
          <Route 
          path = '/item/:id'
          element = {<ItemDetailsPage />}     
          />
          <Route 
          path = '/order'
          element = {<OrderPage />}     
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
