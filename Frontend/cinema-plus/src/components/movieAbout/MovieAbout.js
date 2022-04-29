import React from "react";
import "./movieAbout.scss";
import dateFormat from "dateformat";

function MovieAbout({ data }) {
  console.log(data);
  return (
    <section id="movie-about">
      <div className="row">
        <div className="left-side col-lg-6 col-md-12 d-flex justify-content-start align-items-center gap-5">
          <div className="image">
            <img src={data?.image} alt="movie-poster"></img>
          </div>
          <div className="description">
            <p>{data?.detail.description}</p>
          </div>
        </div>
        <div className="right-side col-lg-6 col-md-12">
          <ul className="movie-details ">
            <li className="row">
              <h6 className="col-md-3">Formatlar</h6>
              <div className="col-md-9">
                {data?.movieFormats.map(({ format }) => (
                  <img
                    key={format.id}
                    src={format.icon}
                    alt="movie-format"
                  ></img>
                ))}
              </div>
            </li>
            <li className="row border-bottom-details">
              <h6 className="col-md-3">Kinotearda</h6>
              <p className="col-md-9">
                {dateFormat(data?.detail.startInCinema, "dd.mm.yyyy")} -{" "}
                {dateFormat(data?.detail.endInCinema, "dd.mm.yyyy")}
              </p>
            </li>
            <li className="row border-bottom-details">
              <h6 className="col-md-3">Ölkə</h6>
              <p className="col-md-9">{data.detail.country}</p>
            </li>
            <li className="row border-bottom-details">
              <h6 className="col-md-3">Rejissor</h6>
              <div className=" directors col-md-9">
                {data?.movieDirectors.map(({ director }) => (
                  <span key={"director" + director.id} className="col-md-9">
                    {director.name} {director.surname},{" "}
                  </span>
                ))}
              </div>
            </li>
            <li className="row border-bottom-details">
              <h6 className="col-md-3">Rollarda</h6>
              <div className=" actors col-md-9">
                {data?.movieActors.map(({ actor }) => (
                  <span key={"actor" + actor.id} className="col-md-9">
                    {actor.name} {actor.surname},{" "}
                  </span>
                ))}
              </div>
            </li>
            <li className="row border-bottom-details">
              <h6 className="col-md-3">Müddət</h6>
              <p className="col-md-9">{data.detail.duration} dəq</p>
            </li>
            <li className="row border-bottom-details">
              <h6 className="col-md-3">Janr</h6>
              <div className=" actors col-md-9">
                {data?.movieGenres.map(({ genre }) => (
                  <span key={"genre" + genre.id} className="col-md-9">
                    {genre.name},{" "}
                  </span>
                ))}
              </div>
            </li>
            <li className="row">
              <h6 className="col-md-3">Yaş həddi</h6>
              <p className="col-md-9">{data.ageLimit}+</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default MovieAbout;
