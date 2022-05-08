import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { aboutService } from "../../API/services/aboutService";
import { cinemaService } from "../../API/services/cinemaService";
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
            <div className="col-md-6">
              <img
                src="https://www.cinemaplus.az/site/templates/images/about1.png"
                alt=""
              ></img>
              <p>
                CinemaPlus şəbəkəsinə 9 kinoteatr, 50+ ekran və 5000+ oturacaq
                daxildir.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://www.cinemaplus.az/site/templates/images/about2.png"
                alt=""
              ></img>
              <p>
                Bizim kinoteatrın “Platinum Movie Suites” zalında film
                izləyəndən sonra Sizdə unudulmaz təəssüratlar qalacaq. Bu
                premium-zalın konsepsiyası tamaşaçılara yüksək komfortlu, arxaya
                açılan təmtəraqlı italyan dəri kreslolarında, kinoseans zamanı
                qida və içki sifariş etmək imkanı olan zalda film izləmək imkanı
                təklif edir.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://www.cinemaplus.az/site/templates/images/about3.png"
                alt=""
              ></img>
              <p>
                “CinemaPlus” öz qonaqları üçün bileti müxtəlif rahat üsullar ilə
                almaq imkanı yaradır: kinoteatrın www.cinemaplus.az rəsmi
                saytından, İOS və Android əməliyyat sistemləri tərəfindən idarə
                olunan smartfonlar üçün təzəlikcə işə düşmüş mobil tətbiq
                vasitəsilə və ya kinoteatrın bilet kassasından.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://www.cinemaplus.az/site/templates/images/about4.png"
                alt=""
              ></img>
              <p>asdasda</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
