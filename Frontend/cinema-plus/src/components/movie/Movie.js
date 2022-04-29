import React, { useCallback, useEffect, useState } from "react";
import { movieService } from "../../API/services/movieService";
import "./movie.scss";
import { Link } from "react-router-dom";
import { useLoadingContext } from "../../context/loading";
import { cinemaService } from "../../API/services/cinemaService";

function Movie() {
  const [moviesData, setMoviesData] = useState();
  const [cinemaData, setCinemaData] = useState();
  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [{ loading, setLoading }] = useLoadingContext();

  const getData = useCallback(() => {
    setLoading(true);
    movieService.getMovies().then((res) => {
      setMoviesData(res.data);
      setLoading(false);
    });
  }, [setLoading]);

  const getCinemas = useCallback(() => {
    cinemaService.getCinema().then((res) => {
      setCinemaData(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getCinemas();
  }, [getCinemas]);

  document.addEventListener("click", function (event) {
    if (!event.target.classList.contains("change-cinema")) {
      setOptionOne(false);
    }
    if (!event.target.classList.contains("change-lang")) {
      setOptionTwo(false);
    }
  });

  return (
    <>
      <div className="header-filter d-flex flex-wrap justify-content-center align-items-center gap-2 gap-lg-5 gap-md-3">
        <select
          className="change-cinema"
          onClick={() => setOptionOne(!optionOne)}
          style={
            optionOne
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "20px" }
          }
        >
          <option value="0" defaultValue>
            Kinoteatrlar
          </option>
          {cinemaData?.map((cinema) => (
            <option key={cinema.id} value={cinema.id}>
              {cinema.name}
            </option>
          ))}
        </select>
        <select
          className="change-lang"
          onClick={() => setOptionTwo(!optionTwo)}
          style={
            optionTwo
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "20px" }
          }
        >
          <option value="0">Bütün dillərdə</option>
          <option value="1">Azərbaycanca</option>
          <option value="2">На русском</option>
          <option value="3">In English</option>
          <option value="4">Türkçe</option>
        </select>
        <div className="in-english d-flex justify-content-center align-items-center">
          <div to={""}>Movies in English</div>
        </div>
      </div>
      <div className="container mt-3 mb-5">
        <section id="movies">
          <div className="cards row justify-content-start">
            {loading ? (
              <div className="loading text-center">Filmlər yüklənir. . .</div>
            ) : (
              moviesData?.map((movie) => (
                <div
                  key={"card" + movie.id}
                  className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-between align-item-center"
                >
                  <div className="card-image">
                    <Link
                      onClick={window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      })}
                      to={`/moviedetail?id=${movie.id}`}
                    >
                      <img
                        src={movie.image}
                        className="card-img-top"
                        alt="film"
                      />
                    </Link>
                  </div>
                  <div className="card-body d-flex justify-content-center align-item-center">
                    <div className="card-title">
                      <ul className="d-flex flex-wrap justify-content-center align-item-center">
                        {movie.movieFormats?.map(({ format }) => (
                          <li key={"format" + format.id}>
                            <img src={format.icon} alt="film-format"></img>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="card-bottom d-flex flex-wrap justify-content-center align-item-center">
                    <Link
                      onClick={window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      })}
                      to={`/moviedetail?id=${movie.id}`}
                      className="btn btn-primary add-cart-button"
                    >
                      SEANSLAR
                    </Link>
                    <Link
                      to={`/moviedetail?id=${movie.id}`}
                      className="age-limit"
                    >
                      <span
                        onClick={window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        })}
                      >
                        {movie.ageLimit}+
                      </span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
        {/* {loading ? (
          ""
        ) : (
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
        )} */}
      </div>
    </>
  );
}

export default Movie;
