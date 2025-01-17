import React, { createContext, useContext, useEffect, useCallback, useState } from 'react';
import axios from 'axios';

const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:3001/api/characters');
      setCharacters(res.data.data.results);
    } catch (err) {
      console.error('Failed to fetch characters:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return (
    <CharactersContext.Provider value={{ characters, loading, error, fetchCharacters }}>
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharacters = () => useContext(CharactersContext);