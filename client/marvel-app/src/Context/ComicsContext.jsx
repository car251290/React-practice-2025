import React, { createContext, useCallback,useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ComicsContext = createContext();

export const ComicsProvider = ({ children }) => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:3001/api/comics');
      setComics(res.data.data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  },[setComics, setLoading, setError]);

  const fetchComicStories = useCallback( async (comicId) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/comics/${comicId}/stories`);
      return res.data.data.results;
    } catch (err) {
      console.error('Failed to fetch comic stories:', err.message);
      return [];
    }
  },[setComics, setLoading, setError]);

  
  const fetchComicsCharacters = useCallback(async (comicsId) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/comics/${comicsId}/characters`);
      return res.data.data.results;
    } catch(error){
      console.error('Failed to fetch comic characters:', error.message);
      return [];
    }
  },[setComics, setLoading, setError]);
  
// useEffect to fetch comics when the component mounts
  useEffect(()=> {
    fetchComics();
  },[fetchComics]);



  return (
    <ComicsContext.Provider value={{ comics, loading, error, fetchComics, fetchComicStories,fetchComicsCharacters }}>
      {children}
    </ComicsContext.Provider>
  );
};

export const useComics = () => useContext(ComicsContext);