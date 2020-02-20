import React from "react";
import PropTypes from "prop-types";
import styles from "../../pages/css/movieDetailsPage.module.css";

const DetailsMovie = ({ movie, onButtonGoBack }) => (
  <>
    <div className={styles.imageDetails}>
      <button type="button" onClick={onButtonGoBack}>
        Go back
      </button>
      <img
        src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
        height="400px"
        width="100%"
      />
    </div>
    <div className={styles.aboutMovie}>
      <h1>{movie.title}</h1>
      <p>User score: {movie.vote_average * 10 + "%"}</p>
      <h2>Overview</h2>
      <p>{movie.overview}</p>
      <h3>Genres</h3>
      <p>{movie.genres.map(genre => genre.name).join(" ")}</p>
    </div>
  </>
);

DetailsMovie.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    )
  }),
  onButtonGoBack: PropTypes.func.isRequired
};

export default DetailsMovie;
