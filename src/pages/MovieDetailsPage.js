import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import DetailsMovie from "../Components/DetailsMovie/DetailsMovie";
import Cast from "../Components/Cast/Cast";
import Reviews from "../Components/Reviews/Reviews";
import Spiner from "../Components/Loader/Loader";

import { fetchDetailsMovie } from "../service/apiMovies";

import styles from "./css/movieDetailsPage.module.css";

export default class MovieDetailsPage extends Component {
  state = { movies: null, error: null, loading: false };

  componentDidMount() {
    this.fetchSelectedMovie();
  }

  fetchSelectedMovie = () => {
    const movieId = this.props.match.params.movieId;
    this.setState({ loading: true });
    fetchDetailsMovie(movieId)
      .then(movies => {
        this.setState({ movies });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleGoBack = () => {
    const { state } = this.props.location;
    if (state && state.from) {
      this.props.history.push(state.from);
    }
  };

  render() {
    const { movies, error, loading } = this.state;
    const { match, location } = this.props;

    return (
      <main>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {loading && <Spiner />}
        {movies && !loading && (
          <div className={styles.wrapper}>
            <DetailsMovie movie={movies} onButtonGoBack={this.handleGoBack} />
            <h4>Additional information</h4>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}/cast`,
                    state: { from: location.state.from }
                  }}
                  className={styles.link}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${match.url}/reviews`,
                    state: { from: location.state.from }
                  }}
                  className={styles.link}
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <Route path={`${match.path}/cast`} component={Cast}></Route>
            <Route path={`${match.path}/reviews`} component={Reviews}></Route>
          </div>
        )}
      </main>
    );
  }
}

MovieDetailsPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
