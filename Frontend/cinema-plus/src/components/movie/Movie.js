import React, { useCallback, useEffect, useMemo, useState } from "react";
import { movieService } from "../../API/services/movieService";
import "./movie.scss";
import { Link } from "react-router-dom";
import { useLoadingContext } from "../../context/loading";

function Movie({ movieCount, selectedSessions, selectedLanguage }) {
  const [moviesData, setMoviesData] = useState();
  const [{ loading, setLoading }] = useLoadingContext();
  // let date = new Date();
  // let today = dateFormat(date.setDate(date.getDate()), "dd.mm.yyyy");
  // let today = date.getDate();

  const getData = useCallback(() => {
    setLoading(true);
    movieService.getMovies().then((res) => {
      setMoviesData(res.data);
      setLoading(false);
    });
  }, [setLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  var movies = useMemo(() => {
    return moviesData;
  }, [moviesData]);

  if (movieCount !== undefined) movies = movies?.slice(0, 4);

  if (selectedSessions !== undefined && selectedSessions.length !== 0)
    movies = movies?.filter((m) =>
      selectedSessions?.some((s) => s.movieId === m.id)
    );

  if (selectedLanguage !== undefined && selectedLanguage !== "0")
    movies = movies?.filter((m) =>
      m.movieFormats?.find((x) => x.format.name.includes(selectedLanguage))
    );

  return (
    <div className="container mt-3 mb-5">
      <section id="movies">
        <div className="cards row justify-content-start">
          {loading ? (
            <div className="loading text-center">Filmlər yüklənir. . .</div>
          ) : movies?.length === 0 ? (
            <div className="loading text-center">Film yoxdur</div>
          ) : (
            movies?.map((movie) => (
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
    </div>
  );
}

export default Movie;
