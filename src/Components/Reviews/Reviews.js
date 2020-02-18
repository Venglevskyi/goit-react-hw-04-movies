import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchShowReviews } from "../../service/apiMovies";
import Spiner from "../Loader/Loader";

export default class Reviews extends Component {
  state = { reviews: [], loading: false, error: null };

  componentDidMount() {
    this.fetchReviews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location === this.props.location) {
      return;
    }
    this.fetchReviews();
  }

  fetchReviews = () => {
    this.setState({ loading: true });

    const movieId = this.props.match.params.movieId;
    fetchShowReviews(movieId)
      .then(reviews => {
        this.setState({ reviews: reviews.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { reviews, loading } = this.state;
    console.log(reviews);

    return (
      <div>
        {loading && <Spiner />}
        {reviews && (
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <p>Author: {author}</p>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
        {reviews.length === 0 && !loading && (
          <p>We don't have any reviews for this movie</p>
        )}
      </div>
    );
  }
}

Reviews.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  )
};
