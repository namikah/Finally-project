import React from "react";
import { Link } from "react-router-dom";
import MobileApp from "../../built-in/MobileApp";
import Socials from "../../built-in/Socials";
import "./footer.scss";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="top-footer row">
          <div className="left-side col-md-4 d-flex justify-content-center align-items-center">
            <ul>
              <li>
                <Link>Haqqımızda</Link>
              </li>
              <li>
                <Link>Xidmətlər</Link>
              </li>
              <li>
                <Link>Haqqımızda</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link>FAQ</Link>
              </li>
              <li>
                <Link>Vakansiyalar</Link>
              </li>
              <li>
                <Link>Əlaqə</Link>
              </li>
            </ul>
          </div>
          <Socials />
          <MobileApp />
        </div>
        <div className="bottom-footer d-flex justify-content-between align-items-center">
          <div className="left-side">
            <p>Bütün hüquqlar qorunur. © CinemaPlus LLC 2012-2022</p>
            <Link to={""}>Saytın tam versiyası</Link>
          </div>
          <div className="right-side">
            <Link>
              <img
                src="https://www.cinemaplus.az/site/templates/images/vipclubcinema2.png"
                alt="vip-club"
              ></img>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
