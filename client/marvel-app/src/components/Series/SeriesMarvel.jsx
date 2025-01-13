import React, { useMemo } from "react";
import { useSeries } from "../../Context/SeriesContext"; // Corrected import
import Spinner from "../Spinner/Spinner"; // Corrected import
export const SeriesMarvel = () => {
  const { series, loading, error } = useSeries();

  const renderedSeries = useMemo(() => {
    if (series && series.length > 0) {
      return series.map((serie) => (
        <div key={serie.id} className="serie-card">
          <h3>{serie.title}</h3>
          <p>{serie.description || 'No description available.'}</p>
        </div>
      ));
    } else {
      return <p>No series available.</p>;
    }
  }, [series]);

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="series-container">
      <h2>Series</h2>
      {renderedSeries}
    </div>
  );
};