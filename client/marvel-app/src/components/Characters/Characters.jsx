import React, { useEffect, useMemo } from 'react';
import { useCharacters } from '../../Context/CharactersContext';
import Spinner from '../Spinner/Spinner'; // Corrected import

const Characters = () => {
  const { characters, loading, error, fetchCharacters } = useCharacters();

  // Fetch characters when the component mounts
  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  // Memoize the rendered characters list
  const renderedCharacters = useMemo(() => {
    if (characters && characters.length > 0) {
      return characters.map((character) => (
        <div key={character.id} className="character-card">
          <h3>{character.name}</h3>
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            style={{ width: '200px' }}
          />
          <p>{character.description || 'No description available.'}</p>
        </div>
      ));
    } else {
      return <p>No characters available.</p>;
    }
  }, [characters]);

  if (loading) return <Spinner />; // Use a spinner for loading state
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>; // Provide more detailed error message

  return (
    <div className="characters-container">
      <h2>Characters</h2>
      {renderedCharacters}
    </div>
  );
};

export default Characters;