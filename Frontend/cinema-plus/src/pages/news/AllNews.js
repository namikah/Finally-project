import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { movieService } from "../../API/services/movieService";
import { newsService } from "../../API/services/newsService";
import dateFormat from "dateformat";
import "./allNews.scss";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useHistory } from "react-router-dom";
import { range } from "range";

function AllNews() {
  const [moviesData, setMoviesData] = useState();
  const [newsData, setNewsData] = useState();
  const [curPage, setCurPage] = useState(1);
  const { push } = useHistory();

  const getData = useCallback(() => {
    movieService.getMovies().then((res) => {
      setMoviesData(res.data);
    });
  }, []);

  const getNewsData = useCallback((page) => {
    newsService.getNews(`?page=${page}&perPage=10`).then((res) => {
      setNewsData(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getNewsData(curPage);
  }, [getNewsData, curPage]);

  const handlePageChange = useCallback(
    (ev) => {
      const val = ev.target.value;
      push(`?page=${val}`);
      setCurPage(val);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    [push]
  );

  const handlePagePrev = useCallback(() => {
    const prevPage = curPage - 1;
    if (prevPage >= 1) {
      push(`?page=${prevPage}`);
      setCurPage(prevPage);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [push, curPage]);

  const maxPageCount = useMemo(
    () => !!newsData && newsData.totalPage,
    [newsData]
  );

  const handlePageNext = useCallback(() => {
    const nextPage = Math.round(curPage) + 1;
    if (nextPage <= maxPageCount) {
      push(`?page=${nextPage}`);
      setCurPage(nextPage);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [push, maxPageCount, curPage]);

  return (
    <section id="all-news">
      <div className="container">
        <div className="row justify-content-between align-items-start">
          <div className="left-side col-md-7 col-sm-12 row justify-content-start align-items-start">
            <div className="tab-header-news">
              <Link to={"/allnews"}>CinemaPlus X??b??rl??ri</Link>
            </div>
            {newsData?.data.map((item) => (
              <div
                key={item.id}
                className="card d-flex flex-wrap justify-content-start align-items-start"
              >
                <div className="card-image col-md-3 col-sm-12">
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
                <div className="card-body col-md-3 col-sm-12">
                  <div>
                    <Link to={`/newsdetail?id=${item.id}`}>{item.title}</Link>
                  </div>
                  <h6>{dateFormat(item.date, "dd.mm.yyyy")}</h6>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center mt-5">
              <Pagination>
                <PaginationItem>
                  <PaginationLink
                    style={
                      curPage.toString() === "1"
                        ? {
                            pointerEvents: "none",
                            color: "black",
                            fontWeight: "700",
                          }
                        : {}
                    }
                    onClick={handlePagePrev}
                    previous
                  />
                </PaginationItem>
                {!!maxPageCount &&
                  range(1, maxPageCount + 1).map((i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        style={
                          curPage.toString() === i.toString()
                            ? {
                                pointerEvents: "none",
                                color: "black",
                                fontWeight: "700",
                              }
                            : {}
                        }
                        value={i}
                        onClick={handlePageChange}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                <PaginationItem>
                  <PaginationLink
                    style={
                      curPage.toString() === maxPageCount.toString()
                        ? {
                            pointerEvents: "none",
                            color: "black",
                            fontWeight: "700",
                          }
                        : {}
                    }
                    onClick={handlePageNext}
                    next
                  />
                </PaginationItem>
              </Pagination>
            </div>
          </div>
          <div className="right-side col-md-4 col-sm-12 d-flex flex-column justify-content-start align-items-center">
            {moviesData?.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="card d-flex flex-column justify-content-start align-items-top p-3"
              >
                <div className="card-body d-flex flex-column justify-content-start align-item-top text-left">
                  <Link to={`/movieDetail?id=${item.id}`}>{item.name}</Link>
                </div>
                <div className="card-image d-flex justify-content-start align-item-left">
                  <Link to={`/movieDetail?id=${item.id}`}>
                    <img src={item.image} className="card-img-top" alt="news" />
                  </Link>
                </div>
              </div>
            ))}
            <Link
              className="button-all"
              to={"/"}
              onClick={window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              })}
            >
              B??t??n filml??r
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllNews;
