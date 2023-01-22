import React, { useState } from "react";

const overlayStyles = {
  position: "absolute",
  filter: "blur(1px)",
  transition: "opacity ease-in 1000ms",
  clipPath: "inset(0)",
};

interface Props {
  fullImageSrc: string;
  overlaySrc: string;
}
export function ProgressiveImage({ fullImageSrc, overlaySrc }: Props) {
  const [isFullImageLoaded, setIsFullImageLoaded] = useState(false);
  <img src={fullImageSrc} onLoad={() => setIsFullImageLoaded(true)}></img>;
  <img {...(isFullImageLoaded && { style: { opacity: "0" } })} src={overlaySrc} className={`${overlayStyles}`} />;
}
