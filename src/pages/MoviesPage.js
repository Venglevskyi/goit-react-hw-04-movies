import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { fetchSearchMovies } from "../service/apiMovies";

import styles from "./css/homePage.module.css";

export default class MoviesPage extends Component {
  state = {
    inputValue: " ",
    movies: null
  };

  componentDidMount() {
    const currentQuery = new URLSearchParams(this.props.location.search).get(
      "query"
    );

    if (!currentQuery) {
      return;
    }

    fetchSearchMovies(currentQuery).then(movies => this.setState({ movies }));
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

    fetchSearchMovies(nextQuery).then(movies => this.setState({ movies }));
  }

  handleChange = ({ target }) => {
    this.setState({ inputValue: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setSearchQuery(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  setSearchQuery = Searchquery => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${Searchquery}`
    });
  };

  render() {
    const { movies, inputValue } = this.state;
    const { match } = this.props;

    return (
      <div>
        <form className={styles.Form} onSubmit={this.handleSubmit}>
          <input
            className={styles.FormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={inputValue}
            onChange={this.handleChange}
          />
          <button className={styles.FormButton} type="submit">
            Search
          </button>
        </form>
        {movies && (
          <ul className={styles.filmMenu}>
            {movies.map(({ id, poster_path, media_type }) => (
              <li key={id} className={styles.filmMenuList}>
                <Link to={`${match.url}/${id}`}>
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
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired
    })
  )
};
