import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Navbar } from "./layout/Navbar";
import { Routes } from "./Routes";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}
