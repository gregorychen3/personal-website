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
            title="Aaron Johnson Quintet 07-03-2022"
            src="https://www.youtube.com/embed/bkfCbIMIqA4?start=88"
          />
        </div>
        <div className="column">
          <YoutubeVideo
            title="Alex Hoffman Quintet - Smalls 10/31/2021 Set 1"
            src="https://www.youtube.com/embed/D9ulpdTD6hY"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <YoutubeVideo
            title="Alex Hoffman Quintet - Smalls 10/31/2021 Set 2"
            src="https://www.youtube.com/embed/wkXdCbxZD2w"
          />
        </div>
        <div className="column">
          <YoutubeVideo
            title="I Concentrate On You - Alex Hoffman Quintet 04-29-2018"
            src="https://www.youtube.com/embed/9u3LmdqAwDA"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <YoutubeVideo
            title="Too Late Now - Alex Hoffman Quintet 04-29-2018"
            src="https://www.youtube.com/embed/56r7TQrSnPo"
          />
        </div>
        <div className="column">
          <YoutubeVideo
            title="If I Could Be With You, James P. Johnson"
            src="https://www.youtube.com/embed/bdLJmW7sR-4"
          />
        </div>
      </div>
    </div>
  </section>
);
