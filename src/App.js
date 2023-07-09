import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Movies from './components/Movies/Movies';

function App() {

  return (
    <div>
      <Navbar />
      <h1>Trending Movies and TV Shows</h1>
      <Movies endpoint={'trending'} />
    </div>
  );
}

export default App;
