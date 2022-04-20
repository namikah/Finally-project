import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { movieService } from "../../API/services/movieService";
import { newsService } from "../../API/services/newsService";
import dateFormat from "dateformat";
import "./allNews.scss";

function AllNews() {
  const [moviesData, setMoviesData] = useState();
  const [newsData, setNewsData] = useState();

  const getData = useCallback(() => {
    movieService.getMovies(`?page=1&per_page=4`).then((res) => {
      setMoviesData(res.data);
    });
  }, []);

  const getNewsData = useCallback(() => {
    newsService.getNews(`?page=1&per_page=4`).then((res) => {
      setNewsData(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getNewsData();
  }, [getNewsData]);

  return (
    <section id="all-news">
      <div className="container">
        <div className="row justify-content-between">
          <div className="left-side col-md-7 col-sm-12 row justify-content-start align-items-start">
            <div className="tab-header-news">
              <Link to={"/allnews"}>CinemaPlus Xəbərləri</Link>
            </div>
            {newsData?.data.map((item) => (
              <div
                key={item.id}
                className="card d-flex flex-wrap justify-content-start align-items-start"
              >
                <div className="card-image col-md-3 col-sm-12">
                  <Link to={`/newsdetail?id=${item.id}`}>
                    <img src={item.image} className="card-img-top" alt="news" />
                  </Link>
                </div>
                <div className="card-body col-md-3 col-sm-12">
                  <div>
                    <Link to={`/newsdetail?id=${item.id}`}>{item.title}</Link>
                  </div>
                    <h6>{dateFormat(item.date, "dd.mm.yyyy")}</h6>
                </div>
              </div>
            ))}
          </div>
          <div className="right-side col-md-4 col-sm-12 d-flex flex-column justify-content-start align-items-center">
            <div className="d-flex flex-column justify-content-start align-items-start">
              {moviesData?.data.map((item) => (
                <div
                  key={item.id}
                  className="card d-flex flex-column justify-content-start align-items-top p-3"
                >
                  <div className="card-body d-flex flex-column justify-content-start align-item-top text-left">
                    <Link to={`/movieDetail?id=${item.id}`}>{item.name}</Link>
                  </div>
                  <div className="card-image d-flex justify-content-start align-item-left">
                    <Link to={`/movieDetail?id=${item.id}`}>
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt="news"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Link className="button-all" to={"/news"}>
              Hamısını göstər
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllNews;
