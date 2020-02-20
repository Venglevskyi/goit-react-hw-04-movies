import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { fetchSearchMovies } from "../service/apiMovies";
import SearchForm from "../Components/SearchForm/SearchForm";

import styles from "./css/homePage.module.css";
import routes from "../routes";

export default class MoviesPage extends Component {
  state = { movies: null, error: null };

  componentDidMount() {
    const currentQuery = new URLSearchParams(this.props.location.search).get(
      "query"
    );

    if (!currentQuery) {
      return;
    }

    this.fetchSearchMoviesByQuery(currentQuery);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = new URLSearchParams(prevProps.location.search).get(
      "query"
    );
    const nextQuery = new URLSearchParams(this.props.location.search).get(
      "query"
    );

    if (prevQuery === nextQuery) {
      return;
    }

    this.fetchSearchMoviesByQuery(nextQuery);
  }

  fetchSearchMoviesByQuery = query => {
    fetchSearchMovies(query)
      .then(movies => this.setState({ movies }))
      .catch(error => this.setState({ error }));
  };

  setSearchQuery = Searchquery => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${Searchquery}`
    });
  };

  render() {
    const { movies, error } = this.state;
    const { location } = this.props;

    return (
      <div>
        <SearchForm onSubmit={this.setSearchQuery} />
        {error && <p>Whoops, something went wrong: {error}</p>}
        {movies && (
          <ul className={styles.filmMenu}>
            {movies.map(({ id, poster_path }) => (
              <li key={id} className={styles.filmMenuList}>
                <Link
                  to={{
                    pathname: `${routes.SEARCH_MOVIES}/${id}`,
                    state: { from: location }
                  }}
                >
                  <img
                    src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt=""
                    height="300px"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

MoviesPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
