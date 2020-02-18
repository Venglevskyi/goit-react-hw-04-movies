import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import Cast from "../Components/Cast/Cast";
import Reviews from "../Components/Reviews/Reviews";

import { fetchDetailsMovie } from "../service/apiMovies";

import routes from "../routes";
import styles from "./css/movieDetailsPage.module.css";

export default class MovieDetailsPage extends Component {
  state = { movies: null };

  componentDidMount() {
    this.fetchSelectedMovie();
  }

  fetchSelectedMovie = () => {
    const movieId = this.props.match.params.movieId;
    fetchDetailsMovie(movieId).then(movies => {
      this.setState({ movies });
    });
  };

  render() {
    const { movies } = this.state;
    const { match } = this.props;

    return (
      <main>
        {movies && (
          <div className={styles.wrapper}>
            <div className={styles.imageDetails}>
              <Link to={routes.HOME}>
                <button type="button">Go back</button>
              </Link>
              <img
                src={`http://image.tmdb.org/t/p/w500/${movies.poster_path}`}
                alt=""
                height="400px"
                width="100%"
              />
            </div>
            <div className={styles.aboutMovie}>
              <h1>{movies.title}</h1>
              <p>{movies.vote_average}</p>
              <h2>Overview</h2>
              <p>{movies.overview}</p>
              <h3>Genres</h3>
              <p>{movies.genres.map(genre => genre.name).join(" ")}</p>
            </div>
            <h4>Additional information</h4>
            <ul>
              <li>
                <Link to={`${match.url}/cast`} className={styles.link}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to={`${match.url}/reviews`} className={styles.link}>
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
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      )
    })
  )
};
