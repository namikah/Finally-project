import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { newsService } from "../../API/services/newsService";
import "./news.scss";
import dateFormat, { masks } from "dateformat";

function News({ page, perPage }) {
  const [news, setNews] = useState();
  const change = useRef();
  const active = useRef();
  const active2 = useRef();
  const active3 = useRef();

  const getData = useCallback((p, pPage) => {
    newsService.getNews(`?page=${p}&per_page=${pPage}`).then((res) => {
      setNews(res.data.data);
    });
  }, []);

  useEffect(() => {
    getData(page, perPage);
  }, [getData, page, perPage]);

  return (
    <section id="cinemaplus-news">
      <div className="d-flex justify-content-center align-itmes-center gap-1">
        <div className="w-100">
          <div className="d-flex justify-content-center align-items-center gap-1">
            <div className="tab-cinemaplus">CINEMAPLUS XƏBƏRLƏRİ</div>
          </div>
        </div>
      </div>
      <div className="news-body">
        <div className="container">
          <div
            ref={change}
            className="d-flex justify-content-start align-items-top gap-3"
          >
            {news?.map((item) => (
              <div key={item.id} className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-start align-items-top">
                <div className="card-image d-flex justify-content-start align-item-left">
                  <img src={item.image} className="card-img-top" alt="news" />
                </div>
                <div className="card-body d-flex flex-column justify-content-start align-item-top text-left">
                  <h6>{dateFormat(item.date, "dd.mm.yyyy")}</h6>
                  <h2>{item.title}</h2>
                  <p>{item.snippet}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination d-flex justify-content-center align-items-center gap-3">
            <span
              className="active"
              ref={active}
              onClick={(e) => {
                change.current.classList.remove("next-one", "next-two");
                active2.current.classList.remove("active");
                active3.current.classList.remove("active");
                e.target.classList.add("active");
              }}
            ></span>
            <span
              ref={active2}
              onClick={(e) => {
                change.current.classList.remove("next-two");
                change.current.classList.add("next-one");
                active.current.classList.remove("active");
                active3.current.classList.remove("active");
                e.target.classList.add("active");
              }}
            ></span>
            <span
              ref={active3}
              onClick={(e) => {
                change.current.classList.add("next-two");
                active.current.classList.remove("active");
                active2.current.classList.remove("active");
                e.target.classList.add("active");
              }}
            ></span>
          </div>
          <div className="all-news d-flex justify-content-center align-items-center">
            <Link to={""}>BÜTÜN XƏBƏRLƏR</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default News;
