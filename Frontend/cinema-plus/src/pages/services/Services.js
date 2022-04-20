import React from "react";
import Service from "../../components/services/Service";
import "./services.scss";

function Services() {
  return (
    <div id="services">
      <div className="container">
        <div className="services-body row text-center">
          <div className="col-12">
            <p className="title">Xidmətler</p>
          </div>
       <Service/>
        </div>
      </div>
    </div>
  );
}

export default Services;
