import React, { Component } from "react";

class MusicListen extends Component {
  render() {
    return (
      <div id="listen_content">
        <br />
        <div id="listen_content_row">
          <iframe
            title="r0c0"
            frameborder="0"
            allowfullscreen
            src="https://www.youtube.com/embed/QSAsV01_DFg"
          />
          <iframe
            title="r0c1"
            frameborder="0"
            allowfullscreen
            src="https://www.youtube.com/embed/9u3LmdqAwDA"
          />
        </div>
        <div id="listen_content_row">
          <iframe
            title="r1c0"
            frameborder="0"
            allowfullscreen
            src="https://www.youtube.com/embed/56r7TQrSnPo"
          />
          <iframe
            title="r1c1"
            frameborder="0"
            allowfullscreen
            src="https://www.youtube.com/embed/hWxNcqLn35I"
          />
        </div>
        <div id="listen_content_row">
          <iframe
            title="r2c0"
            frameborder="0"
            allowfullscreen
            src="https://www.youtube.com/embed/e6tCmuH6xAI?rel=0"
          />
          <iframe
            title="r2c1"
            frameborder="0"
            allowfullscreen
            src="https://www.youtube.com/embed/CI5AnDh5t4o?rel=0"
          />
        </div>
      </div>
    );
  }
}

export default MusicListen;
