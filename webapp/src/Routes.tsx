import React from "react";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";
import ListenPage from "./pages/ListenPage";

export default () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/music/listen" exact component={ListenPage} />
    <Route path="/music/schedule" exact component={HomePage} />
    <Route path="/music/songbook" exact component={HomePage} />
    <Route path="/music/resume" exact component={HomePage} />
    <Route path="/software/resume" exact component={HomePage} />
  </Switch>
);
