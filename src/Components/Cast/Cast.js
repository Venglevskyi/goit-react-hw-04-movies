import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchShowActors } from "../../service/apiMovies";
import styles from "./cast.module.css";

export default class Cast extends Component {
  state = { movies: null };

  componentDidMount() {
    this.fetchCast();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location === this.props.location) {
      return;
    }
    this.fetchCast();
  }

  fetchCast = () => {
    const movieId = this.props.match.params.movieId;
    fetchShowActors(movieId).then(movies => {
      this.setState({ movies });
    });
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        {movies && (
          <ul className={styles.cast}>
            {movies.cast.map(({ id, name, character, profile_path }) => (
              <li key={id} className={styles.castItem}>
                <img
                  src={`http://image.tmdb.org/t/p/w500/${profile_path}`}
                  alt=" "
                  height="250px"
                />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Cast.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired
    })
  )
};
