import React, { useCallback, useEffect, useState } from "react";
import { cinemaService } from "../../API/services/cinemaService";
import "./contact.scss";

function ContactComponent({ cinemaId}) {
  const [cinema, setCinema] = useState({});

  const getData = useCallback((id) => {
    cinemaService.getCinemaById(id).then((res) => {
      setCinema(res.data);
    });
  }, []);

  useEffect(() => {
    getData(cinemaId);
  }, [getData,cinemaId]);

  return (
    <section id="contact-cinema">
      <div className="row">
        <div className="col-md-6 left-side">
          <ul>
            <li>
              <span>Bizim ünvan:</span>
              <p>{cinema.address}</p>
            </li>
            <li>
              <span>Telefon:</span>
              <p>{cinema.mobile}</p>
            </li>
            <li>
              <span>Elektron ünvan:</span>
              <p>{cinema.email}</p>
            </li>
            <li>
              <span>Marketinq şöbəsi:</span>
              <p>{cinema.marketingMail}</p>
            </li>
            <li>
              <span>İş saatı:</span>
              <p>{cinema.workTime}</p>
            </li>
            <li className="write-us">
              <div className="btn btn-primary">Bizə yazın</div>
            </li>
          </ul>
        </div>
        <div className="col-md-6 right-side">
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                // title="unique"
                width="100%"
                height="650"
                id="gmap_canvas"
                src={cinema.mapUrl}
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactComponent;
