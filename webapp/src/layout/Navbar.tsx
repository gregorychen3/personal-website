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
          <a
            href={process.env.PUBLIC_URL + "/music_resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-item"
          >
            Resume
          </a>
        </div>
      </div>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link is-arrowless">Software</a>
        <div className="navbar-dropdown is-right">
          <a
            href={process.env.PUBLIC_URL + "/cs_resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-item"
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/gregorychen3"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-item"
          >
            LinkedIn
          </a>
          <a
            href="https://greg-ally-recipe-book.herokuapp.com/recipes"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-item"
          >
            Recipe Book Web App
          </a>
          <a
            href="https://gregorychen3.github.io/liquor-buddy-website/"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-item"
          >
            LiquorBuddy Mobile App
          </a>
        </div>
      </div>
      <a
        href="mailto:gregorychen3@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-item"
      >
        Contact
      </a>
    </div>
  </nav>
);
