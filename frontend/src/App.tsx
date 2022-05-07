import logo from './assets/senpsi_logo.png';
import './App.css';
import { Link } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <nav
          style={{
            borderBottom: 'solid 1px',
            paddingBottom: '1rem',
          }}
        >
          <Link to='/homepage'>Homepage</Link>
          <div></div>
          <Link to='/loginpage'>Login</Link>
          <div></div>
          <Link to='/infodetailspage'>Info Details</Link>
        </nav>
      </header>
    </div>
  );
}

export default App;
