import React, { Component } from "react";
import PropTypes from "prop-types";

import Spiner from "../Loader/Loader";
import { fetchShowActors } from "../../service/apiMovies";
import styles from "./cast.module.css";

export default class Cast extends Component {
  state = { movies: [], error: null, loading: false };

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
    this.setState({ loading: true });
    const movieId = this.props.match.params.movieId;
    fetchShowActors(movieId)
      .then(data => data.cast)
      .then(movies => {
        this.setState({ movies });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { movies, error, loading } = this.state;

    return (
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Spiner />}
        {movies.length > 0 && !loading && (
          <ul className={styles.cast}>
            {movies.map(({ id, name, character, profile_path }) => (
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
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
