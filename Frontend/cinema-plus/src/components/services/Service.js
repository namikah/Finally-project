import React, { useCallback, useEffect, useState } from "react";
import { servicesService } from "../../API/services/ServicesService";
import "./services.scss";
function Service({ note }) {
  const [services, setServices] = useState([]);

  const getData = useCallback(() => {
    servicesService.getServices().then((res) => {
      setServices(res.data?.filter((x) => x.note === note));
    });
  }, [setServices, note]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      {services &&
        services?.map((item) => (
          <div className="all-services-card col-md-6">
            <img src={item.image && item.image} alt="service"></img>
            <p className="subtitle">{item.title && item.title}</p>
            <div
              className="title  pb-5"
              dangerouslySetInnerHTML={{ __html: item.subTitle }}
            ></div>
          </div>
        ))}
    </>
  );
}

export default Service;
