import React from "react";
import { Route, Switch } from "react-router";
import { HomePage } from "./pages/HomePage";
import { ListenPage } from "./pages/ListenPage";
import { SchedulePage } from "./pages/SchedulePage";
import { SiteCreditsPage } from "./pages/SiteCreditsPage";
import { SongbookPage } from "./pages/SongbookPage";

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/music/listen" exact component={ListenPage} />
      <Route path="/music/schedule" exact component={SchedulePage} />
      <Route path="/music/songbook" exact component={SongbookPage} />
      <Route path="/music/resume" exact component={HomePage} />
      <Route path="/software/resume" exact component={HomePage} />
      <Route path="/credits" exact component={SiteCreditsPage} />
    </Switch>
  );
}
