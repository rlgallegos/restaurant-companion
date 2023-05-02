// import logo from '../logo.svg';
import '../App.css';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Manage from './Manage';
import Welcome from './Welcome';
import User from './User';
import ManageWelcome from './ManageWelcome';

function App() {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-blue-100 text-center App">
      <header className="bg-blue-900 text-gray-100 px-4 py-8 flex justify-between items-center " onClick={handleClick}>
        <h1 className="text-4xl font-bold" style={{ textShadow: "1px 1px #000" }}>Welcome to Nuts N' Bolts</h1>
      </header>
      <main>
        <Routes>
          <Route 
            path = '/'
            element = {<Welcome />}
          />
          <Route 
            path = '/welcome'
            element = {<ManageWelcome />}
          />
          <Route 
          path = '/user/:id/*'
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
