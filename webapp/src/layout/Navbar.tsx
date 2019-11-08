import React from "react";

export default () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item" href="#/">
        GREGORY CHEN
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

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Music</a>
          <div className="navbar-dropdown">
            <a className="navbar-item">Listen</a>
            <a className="navbar-item">Schedule</a>
            <a className="navbar-item">Songbook</a>
            <a className="navbar-item">Resume</a>
          </div>
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Software</a>
          <div className="navbar-dropdown">
            <a className="navbar-item">Resume</a>
            <a className="navbar-item">LinkedIn</a>
            <a className="navbar-item">Recipe Book Web App</a>
            <a className="navbar-item">LiquorBuddy Mobile App</a>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <a className="navbar-item">Contact</a>
      </div>
    </div>
  </nav>
);
