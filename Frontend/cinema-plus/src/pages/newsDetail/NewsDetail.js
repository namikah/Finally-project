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
          <div className="left-side col-md-7 d-flex flex-column justify-content-start align-items-start news-detail-responsive">
            <p className="title">{news.title}</p>
            <h6>{dateFormat(news.date, "dd.mm.yyyy")}</h6>
            <div className="img-news">
              <img
                src={news.medias?.find((x) => x.name === "photo").url}
                alt="news"
              ></img>
            </div>
            <p>{news.snippet}</p>
            <div dangerouslySetInnerHTML={{ __html: news.description }}></div>
            <div className="news-media-videos w-100">
              {news.medias &&
                news.medias?.map(
                  (media) =>
                    media.name === "video" && (
                      <iframe
                        title={news.title}
                        allowFullScreen
                        frameBorder={0}
                        width={"100%"}
                        height={400}
                        src={media.url}
                      ></iframe>
                    )
                )}
            </div>
            <div className="news-media-photos w-100 row justify-content-center">
              {news.medias &&
                news.medias?.map(
                  (media) =>
                    media.name === "photo" && (
                      <div className="card-news-photo col-lg-3 col-md-6 col-sm-12 mb-3">
                        <img
                          src={media.url}
                          className="img-fluid"
                          alt="news"
                        />
                      </div>
                    )
                )}
            </div>
          </div>
          <div className="right-side col-md-4 d-flex flex-column justify-content-start align-items-center">
            <div className="d-flex flex-column justify-content-start align-items-start">
              {allNews?.map((item) => (
                <div
                  onClick={window.scrollTo(0, 0)}
                  key={item.id}
                  className="card d-flex flex-column justify-content-start align-items-top p-3"
                >
                  <div className="card-body d-flex flex-column justify-content-start align-item-top text-left">
                    <Link to={`/newsdetail?id=${item.id}`}>{item.title}</Link>
                  </div>
                  <div className="card-image d-flex justify-content-start align-item-left">
                    <Link to={`/newsdetail?id=${item.id}`}>
                      <img
                        src={
                          item.medias &&
                          item.medias?.find((x) => x.name === "photo").url
                        }
                        className="card-img-top"
                        alt="news"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Link
              onClick={window.scrollTo(0, 0)}
              className="button-all"
              to={"/allnews"}
            >
              Hamısını göstər
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsDetail;
