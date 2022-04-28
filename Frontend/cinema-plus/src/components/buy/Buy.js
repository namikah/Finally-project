import React, { useState } from "react";
import "./buy.scss";

function Buy() {
  return (
    <div  className="zone">
      <div className="select-zone">
        <div className="zone-header d-flex flex-column justify-content-center align-items-center pt-5">
          <h6>1</h6>
          <h6>2</h6>
          <h6>3</h6>
          {/* <div className="row-format">
              {selectedSession.movie.movieFormats?.map(({ format }) => (
                <span key={format.id}>
                  <img
                    className="format-icon"
                    src={format.icon}
                    alt="format"
                  ></img>
                </span>
              ))}
            </div> */}
        </div>
        <div className="zone-body"></div>
        <div className="zone-footer"></div>
        <div  className="zone-close">
          <span>X</span>
        </div>
      </div>
    </div>
  );
}

export default Buy;
