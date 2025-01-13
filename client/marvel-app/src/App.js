import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMenu from './components/HomeMenu/HomeMenu';
import Characters from './components/Characters/Characters';
import Comics from './components/Comics/Comics';
import { SeriesMarvel } from './components/Series/SeriesMarvel'; // Corrected import
import { MarvelProvider } from './Context/MarvelContext';
import { CharactersProvider } from './Context/CharactersContext';
import { ComicsProvider } from './Context/ComicsContext';
import { SeriesProvider } from './Context/SeriesContext';
import './App.css';

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
                  <img src="https://via.placeholder.com/200x300?text=Comic+1" alt="Comic 1" />
                  <img src="https://via.placeholder.com/200x300?text=Comic+2" alt="Comic 2" />
                  <img src="https://via.placeholder.com/200x300?text=Comic+3" alt="Comic 3" />
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