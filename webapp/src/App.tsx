import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Routes from "./Routes";
import Navbar from "./layout/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
};

export default App;
