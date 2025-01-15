import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Marvel12 from '../../img/Marvel12.jpg';
import Marvel10 from '../../img/Marvel10.webp';
import Marvel11 from '../../img/Marvel11.jpeg';
import './homeMenu.css';

const HomeMenu = () => {
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
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
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