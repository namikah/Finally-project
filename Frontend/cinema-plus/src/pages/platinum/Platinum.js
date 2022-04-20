import React from "react";
import Service from "../../components/services/Service";
import "./platinum.scss";

function Platinum() {
  return (
    <div id="services">
      <div className="container">
        <div className="services-body row text-center">
          <div className="col-12">
            <p className="title">Platinum</p>
            <p>
              Platinum – premium sinfindən olan kinozaldır, hansı ki,
              tamaşaçılara maksimum komfort hiss etmək və təsvirin yüksək
              keyfiyyətindən həzz almaq imkanı yaradır. Zalın funksional fərqi
              və üstünlüyü:
            </p>
          </div>
          <Service />
        </div>
      </div>
    </div>
  );
}

export default Platinum;
