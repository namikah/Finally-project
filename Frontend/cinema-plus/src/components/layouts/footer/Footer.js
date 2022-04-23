import React, { useRef } from "react";
import { Link } from "react-router-dom";
import MobileApp from "../../built-in/MobileApp";
import Socials from "../../built-in/Socials";
import "./footer.scss";

function Footer() {
  const scroll = useRef(null);

  const scrollTo = () => window.scrollTo(0, scroll.offsetTop);

  return (
    <footer>
      <div className="container">
        <div className="top-footer row">
          <div className="left-side col-lg-4 col-md-12 d-flex justify-content-center align-items-center pb-3">
            <ul>
              <li>
                <Link to={""}>Haqqımızda</Link>
              </li>
              <li>
                <Link to={""}>Xidmətlər</Link>
              </li>
              <li>
                <Link to={""}>Haqqımızda</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={""}>FAQ</Link>
              </li>
              <li>
                <Link to={""}>Vakansiyalar</Link>
              </li>
              <li>
                <Link to={""}>Əlaqə</Link>
              </li>
            </ul>
          </div>
          <Socials />
          <MobileApp />
        </div>
        <div className="bottom-footer d-flex justify-content-between align-items-center">
          <div className="left-side">
            <p>Bütün hüquqlar qorunur. © CinemaPlus LLC 2012-2022</p>
            <Link onClick={scrollTo} to={"/"}>
              Saytın tam versiyası
            </Link>
          </div>
          <div className="right-side">
            <a
              onClick={scrollTo}
              target="_blank"
              rel="noreferrer"
              href="https://vipclubazerbaijan.com/"
            >
              <img
                src="https://www.cinemaplus.az/site/templates/images/vipclubcinema2.png"
                alt="vip-club"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
