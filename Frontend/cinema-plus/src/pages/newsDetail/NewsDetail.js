import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { newsService } from "../../API/services/newsService";
import "./newsDetail.scss";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";

function NewsDetail() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [news, setNews] = useState({});
  const [allNews, setAllNews] = useState([]);
  const newsId = params.get("id");

  const getData = useCallback((id) => {
    newsService.getNews(id).then((res) => {
      setNews(res.data);
    });
  }, []);

  const getAllNews = useCallback((p, pPage) => {
    newsService.getNews(`?page=${p}&perPage=${pPage}`).then((res) => {
      setAllNews(res.data.data);
    });
  }, []);

  useEffect(() => {
    getData(newsId);
    getAllNews(1, 3);
  }, [getData, getAllNews, newsId]);

  return (
    <section id="news-detail">
      <div className="container">
        <div className="row gap-5 justify-content-between">
          <div className="left-side col-md-7 d-flex flex-column justify-content-start align-items-start">
            <p className="title">{news.title}</p>
            <h6>{dateFormat(news.date, "dd.mm.yyyy")}</h6>
            <div className="img-news">
              <img src={news.image} alt="news"></img>
            </div>
            <p>{news.snippet}</p>
            <p>{news.description}</p>
            <iframe
              title={news.title}
              allowFullScreen
              frameBorder={0}
              width={"100%"}
              height={400}
              src={news.trailer}
            ></iframe>
          </div>
          <div className="right-side col-md-4 d-flex flex-column justify-content-start align-items-center">
            <div className="d-flex flex-column justify-content-start align-items-start">
              {allNews?.map((item) => (
                <div
                  key={item.id}
                  className="card d-flex flex-column justify-content-start align-items-top p-3"
                >
                  <div className="card-body d-flex flex-column justify-content-start align-item-top text-left">
                    <Link to={`/newsdetail?id=${item.id}`}>{item.title}</Link>
                  </div>
                  <div className="card-image d-flex justify-content-start align-item-left">
                    <Link to={`/newsdetail?id=${item.id}`}>
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
              <Link className="button-all" to={"/allnews"}>Hamısını göstər</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsDetail;
