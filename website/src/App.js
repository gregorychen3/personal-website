import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import Header from './components/Header';
import Welcome from './components/Welcome';
import MusicListen from './components/MusicListen';
import MusicSongbookTunes from './components/MusicSongbookTunes';
import ProgrammingResume from './components/ProgrammingResume';
import Contact from './components/Contact';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      visible: false
    }
  }

  get pageContent() {
    return (
      <div>
        <Route exact path="/" render={() => <Redirect to="/index" />} />
        <Route exact path="/index" component={Welcome} />
        <Route path="/music-listen" component={MusicListen} />
        <Route path="/music-songbook-tunes" component={MusicSongbookTunes} />
        <Route path="/programming-resume" component={ProgrammingResume} />
        <Route path="/programming-linkedin"
          component={
            () => {
              window.location = 'https://www.linkedin.com/in/gregorychen3';
              return null;
            }
          }
        />
        <Route path="/programming-recipe-app"
          component={
            () => {
              window.location = 'http://34.229.58.254:3000/recipes';
              return null;
            }
          }
        />
        <Route path="/contact" component={Contact} />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.pageContent}
      </div>
    )
  }
}

export default App;
