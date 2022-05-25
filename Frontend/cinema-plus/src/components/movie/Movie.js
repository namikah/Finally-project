import React, { useCallback, useEffect, useMemo, useState } from "react";
import { movieService } from "../../API/services/movieService";
import "./movie.scss";
import { Link } from "react-router-dom";
import { useLoadingContext } from "../../context/loading";
import dateFormat from "dateformat";

function Movie({
  movieCount,
  selectedSessions,
  selectedLanguage,
  soon,
  movieId,
}) {
  let date = new Date();
  let today = dateFormat(date.setDate(date.getDate()), "yyyy.mm.dd");
  const [moviesData, setMoviesData] = useState();
  const [{ loading, setLoading }] = useLoadingContext();

  const getData = useCallback(() => {
    setLoading(true);
    movieService.getMovies().then((res) => {
      setMoviesData(
        res.data?.filter(
          (x) =>
            (dateFormat(x.detail.startInCinema, "yyyy.mm.dd") <= today &&
              dateFormat(x.detail.endInCinema, "yyyy.mm.dd") >= today) ||
            x.detail.note?.includes("ÖNCƏDƏN SATIŞ")
        )
      );
      setLoading(false);
    });
  }, [setLoading, today]);

  useEffect(() => {
    getData();
  }, [getData]);

  var movies = useMemo(() => {
    return moviesData;
  }, [moviesData]);

  if (movieCount !== undefined)
    movies = movies
      ?.filter((x) => x.id.toString() !== movieId.toString())
      .slice(0, 4);

  if (selectedSessions !== undefined && selectedSessions.length !== 0)
    movies = movies?.filter((m) =>
      selectedSessions?.some((s) => s.movieId === m.id)
    );

  if (selectedLanguage !== undefined && selectedLanguage !== "0")
    movies = movies?.filter((m) =>
      m.movieFormats?.find((x) => x.format.name.includes(selectedLanguage))
    );

  if (soon !== undefined && soon !== "0")
    movies = movies?.filter(
      (m) => dateFormat(m.detail.startInCinema, "yyyy.mm.dd") > today
    );

  return (
    <div className="container mt-3 mb-5">
      <section id="movies">
        <div className="cards row justify-content-start">
          {loading ? (
            <div className="loading text-center">Filmlər yüklənir. . .</div>
          ) : movies?.length === 0 ? (
            <div className="loading text-center">
              Seçiminizə uyğun film tapılmadı. Zəhmət olmasa, birazdan yenidən
              cəhd edin,
            </div>
          ) : (
            movies?.map((movie) => (
              <div
                key={"card" + movie.id}
                className="card col-lg-3 col-md-6 col-sm-12 d-flex flex-column justify-content-between align-item-center"
              >
                <Link
                  to={`/moviedetail?id=${movie.id}`}
                  className="card-header"
                >
                  {movie?.name}
                  {movie?.detail.note && (
                    <Link
                      to={`/moviedetail?id=${movie.id}`}
                      className="card-note"
                    >
                      {movie?.detail?.note}
                    </Link>
                  )}
                </Link>
                <div className="card-image">
                  <Link
                    // onClick={window.scrollTo({
                    //   top: 0,
                    //   left: 0,
                    //   behavior: "smooth",
                    // })}
                    to={`/moviedetail?id=${movie.id}`}
                  >
                    <img
                      src={movie?.image}
                      className="card-img-top img-fluid"
                      alt="film"
                    />
                  </Link>
                </div>
                <div className="card-body d-flex justify-content-center align-item-center">
                  <ul className="d-flex flex-wrap justify-content-center align-item-center">
                    {movie.movieFormats?.map(({ format }) => (
                      <li key={"format" + format.id}>
                        <img
                          src={format.icon}
                          alt="film-format"
                          className="img-fluid"
                        ></img>
                      </li>
                    ))}
                  </ul>
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
    </div>
  );
}

export default Movie;
