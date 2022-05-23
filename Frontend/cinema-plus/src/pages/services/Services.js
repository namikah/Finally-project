import Service from "../../components/services/Service";
import "./services.scss";

function Services() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return (
    <div id="services">
      <div className="container">
        <div className="services-body row text-center">
          <div className="col-12">
            <h4 className="title">Xidmətler</h4>
          </div>
          <Service note="Normal" />
        </div>
      </div>
    </div>
  );
}

export default Services;
