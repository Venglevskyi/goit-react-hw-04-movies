import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { fetchShowPopularMovies } from "../service/apiMovies";
import Spiner from "../Components/Loader/Loader";

import styles from "./css/homePage.module.css";

export default class HomePage extends Component {
  state = {
    movies: [],
    error: null,
    loading: false
  };

  componentDidMount() {
    this.fetchPopularMovies();
  }

  fetchPopularMovies = () => {
    this.setState({ loading: true });
    fetchShowPopularMovies()
      .then(movies => this.setState({ movies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { movies, loading } = this.state;

    return (
      <main>
        <h1 className={styles.title}>Trending today</h1>
        {loading && <Spiner />}
        {movies.length > 0 && !loading && (
          <ul className={styles.filmMenu}>
            {movies.map(({ id, poster_path, media_type }) => (
              <li key={id} className={styles.filmMenuList}>
                <Link to={`movies/${id}`}>
                  <img
                    src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt={media_type}
                    height="300px"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    );
  }
}

HomePage.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      media_type: PropTypes.string.isRequired
    })
  )
};
