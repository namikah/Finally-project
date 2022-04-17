import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

function Header() {
  return (
    <header>
      <div className="container">
        <div className="header-top row align-items-center">
          <div className="col-md-5"></div>
          <div className="col-md-7 d-flex justify-content-between align-items-center p-0">
            <ul class="menu d-flex justify-content-between align-items-center gap-5">
              <li>
                <Link to={""}>Platinum</Link>
              </li>
              <li>
                <Link to={""}>Dolby Atmos</Link>
              </li>
              <li>
                <Link to={""}>Xidmətlər</Link>
              </li>
              <li>
                <Link to={""}>Haqqımızda</Link>
              </li>
            </ul>
            <ul className="lang d-flex justify-content-between align-items-center">
              <li>
                <Link to={""}>AZ</Link>
              </li>
              <li>
                <Link to={""}>RU</Link>
              </li>
              <li>
                <Link to={""}>EN</Link>
              </li>
              <li className="app-icon">
                <Link to={""}>
                  <img
                    src="https://cinemaplus.az/site/templates/images/ios.svg"
                    alt="ios"
                  ></img>
                </Link>
              </li>
              <li className="app-icon">
                <Link to={""}>
                  <img
                    src="https://cinemaplus.az/site/templates/images/android.svg"
                    alt="android"
                  ></img>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-bottom d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5"></div>
            <ul className="col-md-7 d-flex justify-content-between align-items-center">
              <li>
                <Link to={""}>Baş səhifə</Link>
              </li>
              <li>
                <Link to={""}>Aksiyalar</Link>
              </li>
              <li>
                <Link to={""}>Tariflər</Link>
              </li>
              <li className="cine-bonus">
                <Link to={""}>
                  CineBonus<span>Loyalty program</span>
                </Link>
              </li>
              <li>
                <div class="callcenter">
                  <span>
                    <img src="" alt=""></img>+99412 499 89 88
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
    </header>
  );
}

export default Header;
