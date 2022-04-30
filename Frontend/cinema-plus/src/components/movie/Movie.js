import React, { useCallback, useEffect, useMemo, useState } from "react";
import { movieService } from "../../API/services/movieService";
import "./movie.scss";
import { Link } from "react-router-dom";
import { useLoadingContext } from "../../context/loading";
import dateFormat from "dateformat";
import axios from "axios";

function Movie({ movieCount, selectedSessions, selectedLanguage }) {
  let date = new Date();
  // let today = dateFormat(date.setDate(date.getDate()), "dd.mm.yyyy");
  let today = date.getDate();
  const [moviesData, setMoviesData] = useState();
  const [{ loading, setLoading }] = useLoadingContext();
  const getData = useCallback(async () => {
    setLoading(true);
    await axios.get("https://localhost:44392/api/movie").then((res) => {
      // const start = new Date('02/20/2020');
      // const end = new Date('03/01/2020');
  
      // const daysBetween = (end.getTime() - start.getTime())
      
      setMoviesData(
        res.data.filter((x) => true
          //  dateFormat(x.detail.startInCinema).getyear() > today.getyear()
          // new Date(dateFormat(x.detail.endInCinema,"dd.mm.yyyy")).getDate() >= new Date(dateFormat(today,"dd.mm.yyyy")).getDate()

          // moment(x.detail.startInCinema, "mm.dd.yyyy").valueOf() <= moment(today,"dd.mm.yyyy")
          // dateFormat(x.detail.startInCinema) <= today &&
          // dateFormat(x.detail.endInCinema) >= today
        )
      );
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
