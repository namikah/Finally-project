import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, Tabs } from "react-tabs";
import "./news.scss";

function News() {
  const change = useRef();
  return (
    <section id="cinemaplus-news">
      <div className="d-flex justify-content-center align-itmes-center gap-1">
        <Tabs className="w-100">
          <TabList className="d-flex justify-content-center align-items-center gap-1">
            <Tab>CINEMAPLUS NEWS</Tab>
          </TabList>
        </Tabs>
      </div>
      <div className="news-body">
        <div className="container">
          <div
            ref={change}
            className="d-flex justify-content-start align-items-center gap-3"
          >
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
            <div className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-item-center">
              <div className="card-image d-flex justify-content-start align-item-left">
                <img
                  src="https://www.cinemaplus.az/site/assets/files/0/20/31/574/1_1.350x0.png"
                  className="card-img-top"
                  alt="news"
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between align-item-center text-left">
                  <h2>title</h2>
                <p>lorem lorem lorem loremlorem lorem lorem lorem lorem</p>
              </div>
            </div>
          </div>
          <div className="pagination d-flex justify-content-center align-items-center gap-3">
            <span
              onClick={() => {
                change.current.classList.remove("next-one");
                change.current.classList.remove("next-two");
              }}
            ></span>
            <span
              onClick={() => {
                change.current.classList.add("next-one");
                change.current.classList.remove("next-two");
              }}
            ></span>
             <span
              onClick={() => {
                change.current.classList.add("next-two");
              }}
            ></span>
          </div>
          <div className="all-news d-flex justify-content-center align-items-center">
              <Link>ALL NEWS</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default News;
