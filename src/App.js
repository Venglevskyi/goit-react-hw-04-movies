import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MoviesPage from "./pages/MoviesPage";
import Layout from "./Components/Layout/Layout";
import NotFound from "./pages/Notfound";

import routes from "./routes";

const App = () => (
  <Layout>
    <Switch>
      <Route exact path={routes.HOME} component={HomePage}></Route>
      <Route path={routes.MOVIE} component={MovieDetailsPage}></Route>
      <Route path={routes.SEARCH_MOVIES} component={MoviesPage}></Route>
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default App;
