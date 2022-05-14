import React from "react";
import Service from "../../components/services/Service";
import Session from "../../components/session/Session";
import "./platinum.scss";

function Platinum() {
  return (
   <>
    <div id="platinum-services">
      <div className="container">
        <div className="services-body row text-center">
          <div className="col-12">
            <h4 className="title">Platinum</h4>
            <p>
              Platinum – premium sinfindən olan kinozaldır, hansı ki,
              tamaşaçılara maksimum komfort hiss etmək və təsvirin yüksək
              keyfiyyətindən həzz almaq imkanı yaradır. Zalın funksional fərqi
              və üstünlüyü:
            </p>
          </div>
          <Service note="Platinum"/>
        </div>
      </div>
    </div>
    <div id="sessions">
        <Session platinum={true}/>
    </div>
    </>
  );
}

export default Platinum;
