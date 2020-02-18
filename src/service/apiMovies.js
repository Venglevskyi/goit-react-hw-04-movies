const fetchShowPopularMovies = () => {
  const baseUrl =
    "https://api.themoviedb.org/3/trending/all/day?api_key=ffb803f52f4e27e6105837b5e1f7e8d0";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
  return fetch(baseUrl, { options })
    .then(response => response.json())
    .then(data => data.results);
};

const fetchDetailsMovie = movieId => {
  const baseUrl = "https://api.themoviedb.org/3/movie/";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
  const requestParameter = `${movieId}?api_key=ffb803f52f4e27e6105837b5e1f7e8d0&language=en-US`;
  return fetch(baseUrl + requestParameter, { options }).then(response =>
    response.json()
  );
};

const fetchShowActors = movieId => {
  const baseUrl = "https://api.themoviedb.org/3/movie/";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
  const requestParameter = `${movieId}/credits?api_key=ffb803f52f4e27e6105837b5e1f7e8d0&language=en-US`;
  return fetch(baseUrl + requestParameter, { options }).then(response =>
    response.json()
  );
};

const fetchShowReviews = movieId => {
  const baseUrl = "https://api.themoviedb.org/3/movie/";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
  const requestParameter = `${movieId}/reviews?api_key=ffb803f52f4e27e6105837b5e1f7e8d0&language=en-US&page=1`;
  return fetch(baseUrl + requestParameter, { options }).then(response =>
    response.json()
  );
};

const fetchSearchMovies = query => {
  const baseUrl = "https://api.themoviedb.org/3/search/movie";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };
  const requestParameter = `?api_key=ffb803f52f4e27e6105837b5e1f7e8d0&language=en-US&page=1&include_adult=false&query=${query}`;
  return fetch(baseUrl + requestParameter, { options })
    .then(response => response.json())
    .then(data => data.results);
};

export {
  fetchShowPopularMovies,
  fetchDetailsMovie,
  fetchShowActors,
  fetchShowReviews,
  fetchSearchMovies
};
