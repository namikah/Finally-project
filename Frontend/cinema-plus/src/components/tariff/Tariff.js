import React from "react";
import "./tariff.scss";

function Tariff({ cinema }) {
  return (
    <section id="tariff-image">
      <div className="container">
        <div className="row">
          <img src={cinema.tarifUrl} alt="tariff" className="img-fluid"></img>
        </div>
      </div>
    </section>
  );
}

export default Tariff;
