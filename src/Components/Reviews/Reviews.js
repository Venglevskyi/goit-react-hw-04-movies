import React, { Component } from "react";
import PropTypes from "prop-types";

import { fetchShowReviews } from "../../service/apiMovies";

export default class Reviews extends Component {
  state = { reviews: [] };

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
    const movieId = this.props.match.params.movieId;
    fetchShowReviews(movieId).then(reviews => {
      this.setState({ reviews: reviews.results });
    });
  };

  render() {
    const { reviews } = this.state;
    console.log(reviews)

    return (
      <div>
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
        {reviews && reviews.length === 0 && (
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
