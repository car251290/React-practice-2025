import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ComicsContext = React.createContext();

export const ComicsProvider = ({ children }) => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:3001/api/comics');
      setComics(res.data.data.results);
    } catch (err) {
      console.error('Failed to fetch comics:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics();
  }, []);

  return (
    <ComicsContext.Provider value={{ comics, loading, error, fetchComics }}>
      {children}
    </ComicsContext.Provider>
  );
};

export const useComics = () => useContext(ComicsContext);
