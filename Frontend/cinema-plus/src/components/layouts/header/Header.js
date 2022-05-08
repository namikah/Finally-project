import React, { useCallback, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import MobileApp from "../../built-in/MobileApp";
import "./header.scss";

function Header() {
  const [state, setState] = useState(false);
  const scroll = useRef(null);
  const { push } = useHistory();

  const scrollTo = () => window.scrollTo(0, scroll.offsetTop);

  const toggleClick = useCallback(() => {
    setState(!state);
  }, [state]);

  return (
    <header>
      <div id="header-default">
        <div className="container">
          <div className="header-top row align-items-center">
            <div className="left-side col-md-5"></div>
            <ul className="right-side col-md-7 d-flex justify-content-between align-items-center">
              <li className="main-menu">
                <Link onClick={scrollTo} to={"/platinum"}>
                  Platinum
                </Link>
              </li>
              <li className="main-menu">
                <Link onClick={scrollTo} to={"/dolbyatmos"}>
                  Dolby Atmos
                </Link>
              </li>
              <li className="main-menu">
                <Link onClick={scrollTo} to={"/services"}>
                  Xidmətlər
                </Link>
              </li>
              <li className="main-menu">
                <Link onClick={scrollTo} to={"/about"}>
                  Haqqımızda
                </Link>
              </li>
              <li className="lang">
                <Link to={"/az"}>AZ</Link>

                <Link to={"/ru"}>RU</Link>

                <Link to={"/en"}>EN</Link>

                <a
                  className="icon-app"
                  target="_blank"
                  rel="noreferrer"
                  href="https://apps.apple.com/us/app/cinemaplus/id1072140418"
                >
                  <img
                    src="https://cinemaplus.az/site/templates/images/ios.svg"
                    alt="ios"
                  ></img>
                </a>

                <a
                  className="icon-app"
                  target="_blank"
                  rel="noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.promote.cinemaplus"
                >
                  <img
                    src="https://cinemaplus.az/site/templates/images/android.svg"
                    alt="android"
                  ></img>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-bottom d-flex align-items-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="left-side col-md-5"></div>
              <ul className="right-side col-md-7 d-flex justify-content-between align-items-center">
                <li onClick={scrollTo} to={"/"} className="main-menu">
                  <Link to={"/"}>Baş səhifə</Link>
                </li>
                <li className="main-menu">
                  <Link onClick={scrollTo} to={"/campaigns"}>
                    Aksiyalar
                  </Link>
                </li>
                <li className="main-menu">
                  <Link onClick={scrollTo} to={"/tariffs"}>
                    Tariflər
                  </Link>
                </li>
                <li className="cine-bonus main-menu">
                  <Link onClick={scrollTo} to={"/cinebonus"}>
                    CineBonus<span>Loyalty program</span>
                  </Link>
                </li>
                <li className="call-center">
                  <div className="callcenter">
                    <span>
                      <img src="" alt=""></img>
                      +99412 499 89 88
                    </span>
                    <img src="" alt=""></img>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Link
          onClick={() => {
            scrollTo();
            push("/");
          }}
          to={"/"}
          className="header-left-side d-flex justify-content-center"
        >
          <img
            src="https://cinemaplus.az/site/templates/images/cpluslogo.svg"
            alt="logo"
          ></img>
        </Link>
      </div>
      <div id="header-responsive">
        <div className="header-top d-flex justify-content-between align-items-center">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="callcenter">
                <span>
                  <img src="" alt=""></img>
                  +99412 499 89 88
                </span>
                <img src="" alt=""></img>
              </div>
              <div className="lang d-flex justify-content-between align-items-center">
                <Link to={""}>AZ</Link>

                <Link to={""}>RU</Link>

                <Link to={""}>EN</Link>

                <a
                  className="icon-app"
                  target="_blank"
                  rel="noreferrer"
                  href="https://apps.apple.com/us/app/cinemaplus/id1072140418"
                >
                  <img
                    src="https://cinemaplus.az/site/templates/images/ios.svg"
                    alt="ios"
                  ></img>
                </a>

                <a
                  className="icon-app"
                  target="_blank"
                  rel="noreferrer"
                  href="https://play.google.com/store/apps/details?id=com.promote.cinemaplus"
                >
                  <img
                    src="https://cinemaplus.az/site/templates/images/android.svg"
                    alt="android"
                  ></img>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom d-flex justify-content-between align-items-center">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div
                onClick={scrollTo}
                to={"/"}
                className="logo-side d-flex justify-content-center"
              >
                <Link to={"/"}>
                  <img
                    src="https://cinemaplus.az/site/templates/images/cpluslogo.svg"
                    alt="logo"
                  ></img>
                </Link>
              </div>
              <div className="button-side" onClick={() => toggleClick()}>
                <Link to={"#"}>
                  <span></span>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="toggle-menu"
            style={state ? { height: "100vh", overflow: "auto" } : {}}
          >
            <div className="container">
              <ul>
                <li className="main-menu">
                  <Link
                    onClick={() => {
                      scrollTo();
                      toggleClick();
                    }}
                    to={"/platinum"}
                  >
                    Platinum
                  </Link>
                </li>
                <li className="main-menu">
                  <Link
                    onClick={() => {
                      scrollTo();
                      toggleClick();
                    }}
                    to={"/sessions"}
                  >
                    Aksiyalar
                  </Link>
                </li>
                <li className="main-menu">
                  <Link
                    onClick={() => {
                      scrollTo();
                      toggleClick();
                    }}
                    to={"/tariffs"}
                  >
                    Tariflər
                  </Link>
                </li>
                <li className="main-menu">
                  <Link
                    onClick={() => {
                      scrollTo();
                      toggleClick();
                    }}
                    to={"/about"}
                  >
                    Haqqımızda
                  </Link>
                </li>
                <li className="cine-bonus main-menu">
                  <Link
                    onClick={() => {
                      scrollTo();
                      toggleClick();
                    }}
                    to={"/contact"}
                  >
                    Əlaqə
                  </Link>
                </li>
              </ul>
              <div className="d-flex justify-content-center align-items-center">
                <div className="app-icon">
                  <MobileApp />
                </div>
                <div className="social-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
