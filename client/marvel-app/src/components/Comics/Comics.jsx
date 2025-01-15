
import React, { useMemo, useState, useEffect } from "react";
import { useComics } from "../../Context/ComicsContext";
import Spinner from "../Spinner/Spinner"; // Corrected import
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import './Comics.css'; // Custom CSS for additional styling

const Comics = () => {
  const { comics, loading, error, fetchComics, fetchComicStories,fetchComicsCharacters } = useComics();
  const [visibleDescriptions, setVisibleDescriptions] = useState({});
  const [comicStories, setComicStories] = useState({});
  const[comicCharacters, setComicCharacters] = useState({});

  // Fetch comics when the component mounts
  useEffect(() => {
    fetchComics();
  }, [fetchComics]);

  // Handler to toggle the visibility of the description
  const toggleDescription = async (id) => {
    if (!visibleDescriptions[id]) {
      const stories = await fetchComicStories(id);
      setComicStories((prevState) => ({
        ...prevState,
        [id]: stories,
      }));
    }
    // characters fetch
    const characters = await fetchComicsCharacters(id);
    setComicCharacters((prevState)=> ({
      ...prevState,
      [id]: characters,
    }));

    setVisibleDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  // Memoize the rendered comics list
  const renderedComics = useMemo(() => {
    if (comics && comics.length > 0) {
      return comics.map((comic) => (
        <div key={comic.id} className="col-md-4 mb-4">
          <div className="card comic-card h-100">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              className="card-img-top comic-card-img-top"
              alt={comic.title}
            />
            <div className="card-body comic-card-body d-flex flex-column">
              <h5 className="card-title comic-card-title">{comic.title}</h5>
              {visibleDescriptions[comic.id] && (
                <div className="comic-card-text">
                  <h6>Stories:</h6>
                  {comicStories[comic.id] && comicStories[comic.id].length > 0 ? (
                    comicStories[comic.id].map((story) => (
                      <p key={story.id}>{story.title}</p>
                    ))
                  ) : (
                    <p>No stories available.</p>
                  )}
                  <h6>Characters:</h6>
                  {comicCharacters[comic.id] && comicCharacters[comic.id].length > 0 ? (
                    comicCharacters[comic.id].map((character) => (
                      <p key={character.id}>{character.name}</p>
                    ))
                  ) : (
                    <p>No characters available.</p>
                  )}
                </div>
              )}
              <button
                className="btn btn-primary mt-auto"
                onClick={() => toggleDescription(comic.id)}
              >
                {visibleDescriptions[comic.id] ? 'Hide Info' : 'More Info'}
              </button>
            </div>
          </div>
        </div>
      ));
    } else {
      return <p>No comics available.</p>;
    }
  }, [comics, visibleDescriptions, comicStories, comicCharacters]);

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h2 className="my-4">Comics</h2>
      <div className="row">
        {renderedComics}
      </div>
    </div>
  );
};

export default Comics;