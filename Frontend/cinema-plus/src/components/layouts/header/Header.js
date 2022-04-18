import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

function Header() {
  return (
    <header>
      <div id="header-default">
        <div className="container">
          <div className="header-top row align-items-center">
            <div className="left-side col-md-5"></div>
            <ul className="right-side col-md-7 d-flex justify-content-between align-items-center">
              <li className="main-menu">
                <Link to={""}>Platinum</Link>
              </li>
              <li  className="main-menu">
                <Link to={""}>Dolby Atmos</Link>
              </li>
              <li  className="main-menu">
                <Link to={""}>Xidmətlər</Link>
              </li>
              <li  className="main-menu">
                <Link to={""}>Haqqımızda</Link>
              </li>
              <li className="lang">
                <Link to={""}>AZ</Link>

                <Link to={""}>RU</Link>

                <Link to={""}>EN</Link>

                <Link className="icon-app" to={""}>
                  <img
                    src="https://cinemaplus.az/site/templates/images/ios.svg"
                    alt="ios"
                  ></img>
                </Link>

                <Link className="icon-app" to={""}>
                  <img
                    src="https://cinemaplus.az/site/templates/images/android.svg"
                    alt="android"
                  ></img>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-bottom d-flex align-items-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="left-side col-md-5"></div>
              <ul className="right-side col-md-7 d-flex justify-content-between align-items-center">
                <li className="main-menu">
                  <Link to={""}>Baş səhifə</Link>
                </li>
                <li className="main-menu">
                  <Link to={""}>Aksiyalar</Link>
                </li>
                <li className="main-menu">
                  <Link to={""}>Tariflər</Link>
                </li>
                <li className="cine-bonus main-menu">
                  <Link to={""}>
                    CineBonus<span>Loyalty program</span>
                  </Link>
                </li>
                <li className="call-center">
                  <div class="callcenter">
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
        <div className="header-left-side d-flex justify-content-center">
          <img
            src="https://cinemaplus.az/site/templates/images/cpluslogo.svg"
            alt="logo"
          ></img>
        </div>
      </div>
      <div id="header-responsive">
        <div className="header-top d-flex justify-content-between align-items-center">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div class="callcenter">
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

                <Link className="icon-app" to={""}>
                  <img
                    src="https://cinemaplus.az/site/templates/images/ios.svg"
                    alt="ios"
                  ></img>
                </Link>

                <Link className="icon-app" to={""}>
                  <img
                    src="https://cinemaplus.az/site/templates/images/android.svg"
                    alt="android"
                  ></img>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom d-flex justify-content-between align-items-center">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="logo-side d-flex justify-content-center">
                <img
                  src="https://cinemaplus.az/site/templates/images/cpluslogo.svg"
                  alt="logo"
                ></img>
              </div>
              <div className="button-side">
                <Link>
                  <span></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
