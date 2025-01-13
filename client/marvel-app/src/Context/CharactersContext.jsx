import React, { useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useMarvel } from './MarvelContext';

const CharactersContext = React.createContext();

export const CharactersProvider = ({ children }) => {
  const { characters, setCharacters, loading, setLoading, error, setError } = useMarvel();

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
  }, [setCharacters, setLoading, setError]);

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