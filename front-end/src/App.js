import React from "react";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Movies from "./components/Movies/Movies";
import AuthForm from "./components/AuthForm/AuthForm";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="bg-darkBlue min-h-screen text-white flex gap-10 p-8 font-outfit">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/trending" />} />
          <Route path="/trending" element={<Movies isTrending={true} />} />
          <Route path="/movies" element={<Movies endpoint={"movie"} />} />
          <Route path="/tvshows" element={<Movies endpoint={"tv"} />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
