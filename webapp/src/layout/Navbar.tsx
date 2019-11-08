import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

export default () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="navbar-item " href="#/">
        <Link to="/" className="navbar-item">
          <div className="is-size-4">GREGORY CHEN</div>
        </Link>
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
          <Link to="/music/listen" className="navbar-item">
            Listen
          </Link>
          <Link to="/music/schedule" className="navbar-item">
            Schedule
          </Link>
          <Link to="/music/songbook" className="navbar-item">
            Songbook
          </Link>
          <Link to="/music/resume" className="navbar-item">
            Resume
          </Link>
        </div>
      </div>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link is-arrowless">Software</a>
        <div className="navbar-dropdown is-right">
          <Link to="/software/resume" className="navbar-item">
            Resume
          </Link>
          <a className="navbar-item">LinkedIn</a>
          <a className="navbar-item">Recipe Book Web App</a>
          <a className="navbar-item">LiquorBuddy Mobile App</a>
        </div>
      </div>
      <a className="navbar-item">Contact</a>
    </div>
  </nav>
);
