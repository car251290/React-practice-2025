import React from 'react';
import { useCharacters } from '../../Context/CharactersContext';

const Characters = () => {
  const { characters, loading, error } = useCharacters();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h2 className="my-4">Characters</h2>
      <div className="row">
        {characters.map((character) => (
          <div key={character.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                className="card-img-top"
                alt={character.name}
              />
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">{character.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;