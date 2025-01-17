import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Marvel12 from '../../img/Marvel12.jpg';
import Marvel10 from '../../img/Marvel10.webp';
import Marvel11 from '../../img/Marvel11.jpeg';
import './homeMenu.css';
import '../Search/search'
const HomeMenu = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Marvel App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/characters">
                  Characters
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/comics">
                  Comics
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/series">
                  Series
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <div>
        {results.map((result)=> (
          <div key={result.id}>
            <h3>{result.title || result.name}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
      <div className="image-container">
        <div className="card home-card">
          <img src={Marvel12} alt="Marvel12" className="card-img-top home-image" />
        </div>
        <div className="card home-card">
          <img src={Marvel10} alt="Marvel10" className="card-img-top home-image" />
        </div>
        <div className="card home-card">
          <img src={Marvel11} alt="Marvel11" className="card-img-top home-image" />
        </div>
      </div>
    </>
  );
};

export default HomeMenu;