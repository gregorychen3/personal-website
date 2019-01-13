import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div class="nav">
        <div class="nav_title">
          <a href="home.html">GREGORY CHEN</a>
        </div>
        <div class="nav_elements" id="contact">
          <a href="mailto:gregorychen3@gmail.com" target="_blank">Contact</a>
        </div>
        <div class="nav_elements">
          <button class="dropbtn" id="cs_dropbtn">Computer Science</button>
          <div class="menu-content" id="cs-menu-content">
            <a href="cs_resume.pdf">Resume</a>
            <a href="http://www.linkedin.com/in/gregorychen3">LinkedIn</a>
            <a href="http://34.229.58.254:3000">Cookbook App</a>
          </div>
        </div>
        <div class="nav_elements">
          <button class="dropbtn" id="music_dropbtn">Music</button>
          <div class="menu-content" id="music-menu-content">
            <Link to={{ pathname: '/music-listen' }}>Listen</Link>
            <Link to={{ pathname: '/music-schedule' }}>Schedule</Link>
            <Link to={{ pathname: '/music-songbook-tunes' }}>Songbook Tunes</Link>
            <a href="music_resume.pdf">Resume</a>
          </div>
        </div>
      </div>
    )
  }
}
export default Header;
