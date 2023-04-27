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
    <div className="App">
      <header className="App-header" onClick={handleClick}>
        <h1>Welcome to Nuts N' Bolts</h1>
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
