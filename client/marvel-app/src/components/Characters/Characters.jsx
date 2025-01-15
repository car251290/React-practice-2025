import React, { useEffect, useMemo, useState } from 'react';
import { useCharacters } from '../../Context/CharactersContext';
import Spinner from '../Spinner/Spinner'; // Corrected import
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import './Characters.css'; // Corrected import
const Characters = () => {
  const { characters, loading, error, fetchCharacters } = useCharacters();
  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  // Fetch characters when the component mounts
  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  // Handler to toggle the visibility of the description
  const toggleDescription = (id) => {
    setVisibleDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Memoize the rendered characters list
  const renderedCharacters = useMemo(() => {
    if (characters && characters.length > 0) {
      return characters.map((character) => (
        <div key={character.id} className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              className="card-img-top"
              alt={character.name}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{character.name}</h5>
              {visibleDescriptions[character.id] && (
                <p className="card-text">{character.description || 'No description available.'}</p>
              )}
              <button
                className="btn btn-primary mt-auto"
                onClick={() => toggleDescription(character.id)}
              >
                {visibleDescriptions[character.id] ? 'Hide Info' : 'More Info'}
              </button>
            </div>
          </div>
        </div>
      ));
    } else {
      return <p>No characters available.</p>;
    }
  }, [characters, visibleDescriptions]);

  if (loading) return <Spinner />; // Use a spinner for loading state
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>; // Provide more detailed error message

  return (
    <div className="container">
      <h2 className="my-4">Characters</h2>
      <div className="row">
        {renderedCharacters}
      </div>
    </div>
  );
};

export default Characters;