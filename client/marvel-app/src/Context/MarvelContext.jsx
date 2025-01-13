import React, { useState, createContext, useContext } from 'react';

const MarvelContext = createContext();

export const MarvelProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <MarvelContext.Provider value={{ characters, setCharacters, loading, setLoading, error, setError }}>
      {children}
    </MarvelContext.Provider>
  );
};

export const useMarvel = () => useContext(MarvelContext);