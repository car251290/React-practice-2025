import React from 'react';
import { Link } from 'react-router-dom';

const HomeMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link className="nav-link" to="/characters">
            Characters
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/comics">
            Comics
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/series">
            Series
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HomeMenu;