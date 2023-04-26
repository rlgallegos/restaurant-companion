// import logo from '../logo.svg';
import '../App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuDisplay from './MenuDisplay';
import CompleteOrderPage from './CompleteOrderPage';
import ItemDetailsPage from './ItemDetailsPage';
import OrderPage from './OrderPage';
import Manage from './Manage';
import Welcome from './Welcome';
import ManageMenuDisplay from './ManageMenuDisplay';
import ManageAddItemForm from './ManageAddItemForm';
import ManageUsers from './ManageUsers';
import User from './User';

import NavBar from './NavBar';
import ManagePortal from './ManagePortal';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Example Name</h1>
      </header>
      <main>
        <Routes>
          <Route 
          path = '/user/*'
          element = {<User />}     
          />
          <Route 
          path = '/manage/*'
          element = {<Manage />}     
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
