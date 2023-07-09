import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Movies from './components/Movies/Movies';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <h1>Trending Movies and TV Shows</h1>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/movies" />}
          />
          <Route path="/movies" element={<Movies endpoint={'movie'} />} />
          <Route path="/tv" element={<Movies endpoint={'tv'} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
