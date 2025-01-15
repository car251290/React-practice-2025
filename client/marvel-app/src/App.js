import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMenu from './components/HomeMenu/homemenu';
import Characters from './components/Characters/Characters';
import Comics from './components/Comics/Comics';
import { SeriesMarvel } from './components/Series/SeriesMarvel'; // Corrected import
import { MarvelProvider } from './Context/MarvelContext';
import { CharactersProvider } from './Context/CharactersContext';
import { ComicsProvider } from './Context/ComicsContext';
import { SeriesProvider } from './Context/SeriesContext';
import './App.css';

import marvelComics from "../src/img/marvel-comics.jpg";
import Marvel8c from "../src/img/Marvel8c.jpg"; 
import Marvel9c from "../src/img/Marvel9c.webp";

function App() {
  return (
    <Router>
      <div className="App">
        <HomeMenu />
        <div className="home-page">
          <h1>Marvel Page</h1>
          <Routes>
            <Route path="/characters" element={
              <CharactersProvider>
                <Characters />
              </CharactersProvider>
            } />
            <Route path="/comics" element={
              <ComicsProvider>
                <Comics />
              </ComicsProvider>
            } />
            <Route path="/series" element={
              <SeriesProvider>
                <SeriesMarvel />
              </SeriesProvider>
            } />
            <Route path="/" element={
              <div>
                <h2>Welcome to the Marvel Page</h2>
                {/* Placeholder for comic images */}
                <div>
                 <img src={marvelComics} alt="Marvel5" style={{ width: "200px", margin: "10px" }} />
                 <img src={Marvel8c} alt="Marvel8c" style={{ width: "200px", margin: "10px" }} />
                  <img src={Marvel9c} alt="Marvel9c" style={{ width: "200px", margin: "10px" }} />
                </div>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Wrap App in MarvelProvider to provide context
const WrappedApp = () => (
  <MarvelProvider>
    <App />
  </MarvelProvider>
);

export default WrappedApp;