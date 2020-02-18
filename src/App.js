import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MoviesPage from "./pages/MoviesPage";
import Navigation from "./Components/Navigation/Navigation";

import routes from "./routes";

const App = () => (
  <>
    <Navigation />
    <Switch>
      <Route exact path={routes.HOME} component={HomePage}></Route>
      <Route path={routes.MOVIE} component={MovieDetailsPage}></Route>
      <Route path={routes.SEARCH_MOVIES} component={MoviesPage}></Route>
      <Redirect to={routes.HOME} />
    </Switch>
  </>
);

export default App;
