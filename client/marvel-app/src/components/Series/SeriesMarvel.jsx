import React, { useMemo, useState, useEffect } from "react";
import { useSeries } from "../../Context/SeriesContext"; // Corrected import
import Spinner from "../Spinner/Spinner"; // Corrected import
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import './Serie.css'; // Corrected import
export const SeriesMarvel = () => {
  const { series, loading, error, fetchSeries } = useSeries();
  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  // Fetch series when the component mounts
  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  // Handler to toggle the visibility of the description
  const toggleDescription = (id) => {
    setVisibleDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Memoize the rendered series list
  const renderedSeries = useMemo(() => {
    if (series && series.length > 0) {
      return series.map((serie) => (
        <div key={serie.id} className="col-md-4 mb-4">
          <div className="card h-100">
            <img
              src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
              className="card-img-top"
              alt={serie.title}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{serie.title}</h5>
              {visibleDescriptions[serie.id] && (
                <p className="card-text">{serie.description || 'No description available.'}</p>
              )}
              <button
                className="btn btn-primary mt-auto"
                onClick={() => toggleDescription(serie.id)}
              >
                {visibleDescriptions[serie.id] ? 'Hide Info' : 'More Info'}
              </button>
            </div>
          </div>
        </div>
      ));
    } else {
      return <p>No series available.</p>;
    }
  }, [series, visibleDescriptions]);

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h2 className="my-4">Series</h2>
      <div className="row">
        {renderedSeries}
      </div>
    </div>
  );
};