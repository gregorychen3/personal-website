import React, { Component } from 'react';
//import { Route, Redirect } from "react-router-dom";
import Header from './components/Header';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      visible: false
    }
  }

  render() {
    return (
      <Header />
    )
  }
}

export default App;
