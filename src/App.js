import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MoviesPage from "./pages/MoviesPage";
import Layout from "./Components/Layout/Layout";

import routes from "./routes";

const App = () => (
  <Layout>
    <Switch>
      <Route exact path={routes.HOME} component={HomePage}></Route>
      <Route path={routes.MOVIE} component={MovieDetailsPage}></Route>
      <Route path={routes.SEARCH_MOVIES} component={MoviesPage}></Route>
      <Redirect to={routes.HOME} />
    </Switch>
  </Layout>
);

export default App;
