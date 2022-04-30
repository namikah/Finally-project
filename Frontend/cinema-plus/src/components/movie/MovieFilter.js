import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Movie from "./Movie";
import "./movieFilter.scss";

function MovieFilter() {
  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [cinemaData, setCinemaData] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState("0");
  // const [{ sessionData }] = useSessionContext([]);
  const [sessionData, setSessionData] = useState([])
  const [selectedCinemaId, setSelectedCinemaId] = useState(0);

  const getCinemas = useCallback(async() => {
    await axios.get("https://localhost:44392/api/cinema").then((res) => {
      setCinemaData(res.data);
    });
  }, []);

  useEffect(() => {
    getCinemas();
  }, [getCinemas]);

  const getData = useCallback(async() => {
    await axios.get("https://localhost:44392/api/session").then((res) => {
      setSessionData(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  let selectedSessions = useMemo(() => {
    return sessionData?.filter(
      (s) => s.hall.cinemaId.toString() === selectedCinemaId.toString()
    );
  }, [sessionData, selectedCinemaId]);

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
          onChange={(e) => setSelectedCinemaId(e.target.value)}
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
          onChange={(e) => setSelectedLanguage(e.target.value)}
          onClick={() => setOptionTwo(!optionTwo)}
          style={
            optionTwo
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "20px" }
          }
        >
          <option value="0">Bütün dillərdə</option>
          <option value="Az">Azərbaycanca</option>
          <option value="Rus">На русском</option>
          <option value="Eng">In English</option>
          <option value="Tur">Türkçe</option>
        </select>
        <div className="in-english d-flex justify-content-center align-items-center">
          <div to={""}>Movies in English</div>
        </div>
      </div>
      <Movie
        selectedSessions={selectedSessions}
        selectedLanguage={selectedLanguage}
      />
    </>
  );
}

export default MovieFilter;
