import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { fetchShowPopularMovies } from "../service/apiMovies";
import Spiner from "../Components/Loader/Loader";
import Button from "../Components/Button/Button";

import routes from "../routes";
import styles from "./css/homePage.module.css";

export default class HomePage extends Component {
  state = {
    movies: [],
    page: 1,
    error: null,
    loading: false
  };

  componentDidMount() {
    this.fetchPopularMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.movies !== prevState.movies && prevState.movies.length !== 0) {
      this.scroller();
      console.log("hhd")
    }
  }

  fetchPopularMovies = () => {
    const { page } = this.state;

    this.setState({ loading: true });

    fetchShowPopularMovies(page)
      .then(movies =>
        this.setState(state => ({
          movies: [...state.movies, ...movies],
          page: state.page + 1
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  scroller = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  render() {
    const { movies, loading, error } = this.state;

    return (
      <main>
        <h1 className={styles.title}>Trending today</h1>
        {error && <p>Whoops, something went wrong: {error.massage}</p>}
        {loading && <Spiner />}
        {movies.length > 0 && (
          <ul className={styles.filmMenu}>
            {movies.map(({ id, poster_path, media_type }) => (
              <li key={id} className={styles.filmMenuList}>
                <Link
                  to={{
                    pathname: `${routes.SEARCH_MOVIES}/${id}`,
                    state: { from: this.props.location }
                  }}
                >
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
        {movies.length > 0 && !loading && (
          <Button clickButton={this.fetchPopularMovies} />
        )}
      </main>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
