import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { movieService } from "../../API/services/movieService";
import { range } from "range";
import "./movie.scss";
import { Link } from "react-router-dom";
import { useLoadingContext } from "../../context/loading";

function Movie({ defaultPerPage }) {
  const [moviesData, setMoviesData] = useState();
  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const { push } = useHistory();
  const [{ loading, setLoading }] = useLoadingContext([]);

  const getData = useCallback(
    (page, PerPage) => {
      setLoading(true);
      movieService.getMovies(`?page=${page}&perPage=${PerPage}`).then((res) => {
        setMoviesData(res.data);
        setLoading(false);
      });
    },
    [setLoading]
  );

  useEffect(() => {
    getData(curPage, defaultPerPage);
  }, [getData, curPage, defaultPerPage]);

  const handlePageChange = useCallback(
    (ev) => {
      const val = ev.target.value;
      push(`?page=${val}`);
      setCurPage(val);
    },
    [push]
  );

  const handlePagePrev = useCallback(() => {
    const prevPage = curPage - 1;
    if (prevPage >= 1) {
      push(`?page=${prevPage}`);
      setCurPage(prevPage);
    }
  }, [push, curPage]);

  const maxPageCount = useMemo(
    () => !!moviesData && moviesData.totalPage,
    [moviesData]
  );

  const handlePageNext = useCallback(() => {
    const nextPage = Math.round(curPage) + 1;
    if (nextPage <= maxPageCount) {
      push(`?page=${nextPage}`);
      setCurPage(nextPage);
    }
  }, [push, maxPageCount, curPage]);

  return (
    <>
      <div className="header-filter d-flex flex-wrap justify-content-center align-items-center gap-2 gap-lg-5 gap-md-3">
        <select
          onMouseDown={() => setOptionOne(true)}
          onMouseLeave={() => setOptionOne(false)}
          style={
            optionOne
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "20px" }
          }
        >
          <option value="0" defaultValue>
            Kinoteatrlar
          </option>
          <option value="1">28 Mall</option>
          <option value="2">Ganclik Mall</option>
          <option value="2">Deniz Mall</option>
          <option value="2">Azerbaijan Cinema</option>
        </select>
        <select
          onMouseDown={() => setOptionTwo(true)}
          onMouseLeave={() => setOptionTwo(false)}
          style={
            optionTwo
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "20px" }
          }
        >
          <option value="0">Bütün dillərdə</option>
          <option value="1800">Azərbaycanca</option>
          <option value="1798">На русском</option>
          <option value="1797">In English</option>
          <option value="1799">Türkçe</option>
        </select>
        <div className="in-english d-flex justify-content-center align-items-center">
          <Link to={""}>Movies in English</Link>
        </div>
      </div>
      <div className="container mt-3 mb-5">
        <section id="movies">
          <div className="cards row justify-content-start">
            {loading ? (
              <div className="loading text-center">Seanslar yüklənir. . .</div>
            ) : (
              moviesData?.data.map((item) => (
                <div
                  key={"card" + item.id}
                  className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-between align-item-center"
                >
                  <div className="card-image">
                    <Link to={`/moviedetail?id=${item.id}`}>
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt="film"
                      />
                    </Link>
                  </div>
                  <div className="card-body d-flex justify-content-center align-item-center">
                    <div className="card-title">
                      <ul className="d-flex flex-wrap justify-content-center align-item-center">
                        {item.movieFormats?.map(({ format }) => (
                          <li key={"format" + format.id}>
                            <img src={format.icon} alt="film-format"></img>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="card-bottom d-flex flex-wrap justify-content-center align-item-center">
                    <Link
                      to={`/moviedetail?id=${item.id}`}
                      className="btn btn-primary add-cart-button"
                    >
                      SEANSLAR
                    </Link>
                    <Link
                      to={`/moviedetail?id=${item.id}`}
                      className="age-limit"
                    >
                      <span>{item.ageLimit}+</span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        <div className="pagination-component d-flex justify-content-center mt-5">
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
                <PaginationItem key={"page" + i}>
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
    </>
  );
}

export default Movie;
