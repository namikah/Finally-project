import React from "react";
import "./banner.scss";

function Banner({ cinema }) {
  return (
    <div
      className="layout-banner d-flex justify-content-center align-items-center text-center"
      style={{
        backgroundImage: `url(${
          cinema.images && cinema.images.length !== 0 && cinema.images[0].image
        })`,
      }}
    >
      <div className="container">
        <h4>{cinema.name}</h4>
        <h6 dangerouslySetInnerHTML={{__html: cinema.description}}></h6>
      </div>
    </div>
  );
}

export default Banner;
