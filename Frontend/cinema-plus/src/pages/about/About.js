import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { aboutService } from "../../API/services/aboutService";
import { cinemaService } from "../../API/services/cinemaService";
import Service from "../../components/services/Service";
import "./about.scss";

function About() {
  const [cinemaData, setCinemaData] = useState();
  const [abouts, setAbouts] = useState();

  const getData = useCallback(() => {
    cinemaService.getCinema().then((res) => {
      setCinemaData(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const getAbout = useCallback(() => {
    aboutService.getAbout().then((res) => {
      setAbouts(res.data);
    });
  }, []);

  useEffect(() => {
    getAbout();
  }, [getAbout]);

  return (
    <section id="about">
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="col-md-12 text-center pt-5 pb-3">"CinemaPlus"</h2>
          <ul className="about-us col-md-12">
            {abouts?.map((item) => (
              <li key={item.id}>
                <p>{item.subTitle}</p>
              </li>
            ))}
          </ul>
          <ul className="cinemas-us col-md-7 text-center">
            {cinemaData &&
              cinemaData?.map(({ id, name }) => (
                <li key={id}>
                  <Link
                    to={`/cinema?id=${id}`}
                    onClick={window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    })}
                  >
                    {name}
                  </Link>
                </li>
              ))}
          </ul>
          <div className="services-us row text-center">
          <Service note="About"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
