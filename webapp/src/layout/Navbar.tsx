import React from "react";
import "./Navbar.scss";

export default () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item " href="#/">
        <div className="is-size-4">GREGORY CHEN</div>
      </a>

      <a
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div className="navbar-end">
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link is-arrowless">Music</a>
        <div className="navbar-dropdown is-right">
          <a className="navbar-item">Listen</a>
          <a className="navbar-item">Schedule</a>
          <a className="navbar-item">Songbook</a>
          <a className="navbar-item">Resume</a>
        </div>
      </div>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link is-arrowless">Software</a>
        <div className="navbar-dropdown is-right">
          <a className="navbar-item">Resume</a>
          <a className="navbar-item">LinkedIn</a>
          <a className="navbar-item">Recipe Book Web App</a>
          <a className="navbar-item">LiquorBuddy Mobile App</a>
        </div>
      </div>
      <a className="navbar-item">Contact</a>
    </div>
  </nav>
);
