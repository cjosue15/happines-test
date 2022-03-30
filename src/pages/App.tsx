import React from 'react';
import List from '../components/List/List';
import Navbar from '../components/Navbar/Navbar';
import './App.scss';

function App() {
  return (
    <>
      <Navbar />
      <div className='App'>
        <div className='container'>
          <List />
        </div>
      </div>
    </>
  );
}

export default App;
