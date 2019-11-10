import React from "react";

interface YoutubeVideoProps {
  title: string;
  src: string;
}
const YoutubeVideo = ({ title, src }: YoutubeVideoProps) => (
  <iframe
    title={title}
    src={src}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    data-frameborder="0"
    data-allowfullscreen
    width="100%"
    height="315"
  />
);

export default () => (
  <section className="section">
    <div className="container">
      <div className="columns">
        <div className="column">
          <YoutubeVideo
            title="I Can Dream, Can't I - Alex Hoffman Quintet 04-29-2018"
            src="https://www.youtube.com/embed/QSAsV01_DFg?controls=0"
          />
        </div>
        <div className="column">
          <YoutubeVideo
            title="I Concentrate On You - Alex Hoffman Quintet 04-29-2018"
            src="https://www.youtube.com/embed/9u3LmdqAwDA?controls=0"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <YoutubeVideo
            title="Too Late Now - Alex Hoffman Quintet 04-29-2018"
            src="https://www.youtube.com/embed/56r7TQrSnPo?controls=0"
          />
        </div>
        <div className="column">
          <YoutubeVideo
            title="If I Could Be With You, James P. Johnson"
            src="https://www.youtube.com/embed/bdLJmW7sR-4?controls=0"
          />
        </div>
      </div>
    </div>
  </section>
);
