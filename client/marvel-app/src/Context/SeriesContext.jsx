import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const SeriesContext = React.createContext();

export const SeriesProvider = ({ children }) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSeries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:3001/api/series');
      setSeries(res.data.data.results);
    } catch (err) {
      console.error('Failed to fetch series:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <SeriesContext.Provider value={{ series, loading, error, fetchSeries }}>
      {children}
    </SeriesContext.Provider>
  );
};

export const useSeries = () => useContext(SeriesContext);