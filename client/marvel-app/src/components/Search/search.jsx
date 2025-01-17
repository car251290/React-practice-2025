import React, {useState, useEffect} from 'react';
import axios from 'axios';
const Search = () =>{
    const [query,setQuery] = useState('');
    const [results,setResults] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);    

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
          const res = await axios.get(`http://localhost:3001/api/search`, {
            params: { query },
          });
          setResults(res.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      return(
        <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for series, comics, or characters"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {results.map((result) => (
          <div key={result.id}>
            <h3>{result.title || result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
      )

}

export default Search;