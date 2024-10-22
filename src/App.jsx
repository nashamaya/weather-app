import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";
import FavoriteCities from "./components/FavoriteCities";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/favorite-cities" element={<FavoriteCities />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
