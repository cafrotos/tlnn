import React from 'react';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.less"

const CarouseResource = ({
  multimedias,
  alt,
}) => {
  const getChildren = (_multimedias) => {
    const children = [];
    _multimedias.images instanceof Array && multimedias.images.map((image, index) => children.push(
      <div key={index}>
        <img width={50} src={image.url} alt={alt} />
      </div>
    ))
    _multimedias.videos instanceof Array && multimedias.videos.map((video, index) => children.push(
      <div key={index}>
        <video autoPlay={false} width="100%" controls={true}>
          <source src={video.url} />
        </video>
      </div>
    ))
    _multimedias.audios instanceof Array && multimedias.audios.map((audio, index) => children.push(
      <div key={index}>
        <audio controls={true} className="audio">
          <source src={audio.url} />
        </audio>
      </div>
    ))
    return children
  }

  return (
    <Carousel
      autoPlay={false}
      showThumbs={false}
      className="carousel"
    >
      {
        getChildren(multimedias)
      }
    </Carousel>
  )
}
CarouseResource.defaultProps = {
  multimedias: {},
  alt: "",
}

export default CarouseResource