import React from "react";
import { Route, Switch } from "react-router";
import HomePage from "./pages/HomePage";

export default () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
  </Switch>
);
