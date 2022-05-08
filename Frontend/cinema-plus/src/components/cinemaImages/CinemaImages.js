import React from "react";
import "./cinemaImages.scss";

function CinemaImages({ cinema }) {
  return (
    <section id="cinema-images" className="mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center align-items-center gap-3">
          {cinema &&
            cinema.images?.map((item) =>
              cinema.images &&
              cinema.images.length !== 0 &&
              item !== cinema.images[0] ? (
                <div key={item.id} className="col-md-2">
                  <img src={item.image} alt="" className="img-fluid"></img>
                </div>
              ) : (
                ""
              )
            )}
        </div>
      </div>
    </section>
  );
}

export default CinemaImages;
