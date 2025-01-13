import React, { useMemo } from "react";
import { useComics } from "../../Context/ComicsContext"; // Corrected import
import Spinner from "../Spinner/Spinner"; // Corrected import
const Comics = () => {
  const { comics, loading, error } = useComics();

  const renderedComics = useMemo(() => {
    if (comics.length > 0) {
      return comics.map((comic) => (
        <div key={comic.id} className="comic-card">
          <h3>{comic.title}</h3>
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            style={{ width: "200px" }}
          />
          <p>{comic.description || "No description available."}</p>
        </div>
      ));
    } else {
      return <p>No comics available.</p>;
    }
  }, [comics]);

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="comics-container">
      <h2>Comics</h2>
      {renderedComics}
    </div>
  );
};

export default Comics;