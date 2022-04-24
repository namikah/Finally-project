import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import React, { useCallback, useEffect, useState } from "react";
import "./movieDetail.scss";
import MovieAbout from "../../components/movieAbout/MovieAbout";
import Trailer from "../../components/trailer/Trailer";
import { useLocation } from "react-router-dom";
import { movieService } from "../../API/services/movieService";
import Movie from "../../components/movie/Movie";
import Session from "../../components/session/Session";

function MovieDetail() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const [movies, setMovies] = useState({});
    const movieId = params.get("id");
  
    const getData = useCallback((id) => {
      movieService.getMovies(id).then((res) => {
        setMovies(res.data);
      });
    }, []);
  
    useEffect(() => {
      getData(movieId);
    }, [getData, movieId]);
  return (
    <>
      <section id="owl-trailer">
        <div className="video-player">
          <iframe
            width="100%"
            height="600px"
            src="https://www.youtube.com/embed/c9UTvqQ8rGU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section id="tab-header">
        <div className="d-flex justify-content-center align-itmes-center gap-1">
          <Tabs className="w-100">
            <TabList className="bottom-bordered d-flex justify-content-center align-items-center gap-1">
              <Tab>SEANSLAR</Tab>
              <Tab>HAQQINDA</Tab>
              <Tab>TREYLER</Tab>
            </TabList>
            <TabPanel>
             <Session movieId={movieId}/>
            </TabPanel>
            <TabPanel>
              <MovieAbout data={movies}/>
            </TabPanel>
            <TabPanel>
              <Trailer />
            </TabPanel>
          </Tabs>
        </div>
      </section>
      <section id="tab-header">
        <div className="d-flex justify-content-center align-itmes-center gap-1">
          <Tabs className="w-100">
            <TabList className="bottom-bordered d-flex justify-content-center align-items-center gap-1">
              <Tab>DiGƏR FİLMLƏR</Tab>
            </TabList>
            <TabPanel className="another-films">
              <Movie defaultPerPage={4}/>
            </TabPanel>
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default MovieDetail;
