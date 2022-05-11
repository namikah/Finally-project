import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./session.scss";
import dateFormat from "dateformat";
import { useLoadingContext } from "../../context/loading";
import { seatTypeService } from "../../API/services/seatTypeService";
import { cinemaService } from "../../API/services/cinemaService";
import { sessionService } from "../../API/services/sessionService";
import Seat from "../seat/Seat";
import { useContsantContext } from "../../context/constant";
import { ticketService } from "../../API/services/ticketService";

function Session(props) {
  let date = new Date();
  let today = dateFormat(date.setDate(date.getDate()), "dd.mm.yyyy");
  let tomorrow = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow2 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow3 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow4 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");

  const [{ loading }] = useLoadingContext();
  const [{ totalPay, setTotalPay }] = useContsantContext(0);
  const [{ tickets, setTickets }] = useContsantContext([]);
  const [sessionData, setSessionData] = useState([]);
  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [dateSelected, setDateSelected] = useState(today);
  const [selectedSessionId, setSelectedSessionId] = useState();
  const [seatType, setSeatType] = useState();
  const [cinemaData, setCinemaData] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const zone = useRef();

  const getCinemas = useCallback(() => {
    cinemaService.getCinema().then((res) => {
      setCinemaData(res.data);
    });
  }, []);

  useEffect(() => {
    getCinemas();
  }, [getCinemas]);

  const getData = useCallback(() => {
    sessionService.getSession().then((res) => {
      setSessionData(res.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const getSeatType = useCallback(() => {
    seatTypeService.getSeatType().then((res) => {
      setSeatType(res.data);
    });
  }, []);

  useEffect(() => {
    getSeatType();
  }, [getSeatType]);

  var sessions = useMemo(() => {
    return sessionData?.filter(
      (session) => dateFormat(session.date, "dd.mm.yyyy") === dateSelected
    );
  }, [sessionData, dateSelected]);

  var selectedSession = useMemo(() => {
    return sessions?.find((x) => x.id === selectedSessionId);
  }, [sessions, selectedSessionId]);

  if (props.platinum !== undefined) {
    sessions = sessions?.filter(
      (session) =>
        session.hall.name.includes("Platinum") ||
        session.hall.name.includes("VIP")
    );
  }

  if (props.movieId !== undefined) {
    sessions = sessions?.filter(
      (session) => session.movieId.toString() === props.movieId.toString()
    );
  }

  if (selectedLanguage !== undefined && selectedLanguage !== "") {
    sessions = sessions?.filter((s) =>
      s.sessionFormats?.find((f) => f.format.name.includes(selectedLanguage))
    );
  }

  if (selectedCinemaId !== undefined && selectedCinemaId !== "") {
    sessions = sessions?.filter(
      (s) => s.hall.cinemaId.toString() === selectedCinemaId.toString()
    );
  }

  const selectCinema = useCallback(() => {
    if (props.selectedCinemaId !== undefined && props.selectedCinemaId !== "") {
      setSelectedCinemaId(props.selectedCinemaId);
    }
  }, [props.selectedCinemaId]);

  useEffect(() => {
    selectCinema();
  }, [selectCinema]);

  document.addEventListener("click", function (event) {
    if (!event.target.classList.contains("change-cinema")) {
      setOptionTwo(false);
    }
    if (!event.target.classList.contains("change-date")) {
      setOptionOne(false);
    }
    if (!event.target.classList.contains("change-lang")) {
      setOptionThree(false);
    }
  });

  const getTicket = useCallback(() => {
    ticketService.getTicket().then((res) => {});
  }, []);

  const addTicket = useCallback(
    (tickets) => {
      console.log(tickets);
      ticketService.postTickets(tickets).then((res) => {
        // getTicket();
        console.log("succes");
        console.log(res);
      }).catch((rest)=>{
        console.log("catch");
        console.log(rest);

      });
    },
    []
  );

  return (
    <section id="session">
      <div className="header-filter d-flex flex-wrap justify-content-center align-items-center gap-2 gap-lg-5 gap-md-3">
        <div className="filter-date d-flex justify-content-center align-items-center">
          <div className="in-english date-today d-flex justify-content-center align-items-center">
            <div
              onClick={() => setDateSelected(today)}
              style={
                dateSelected === today
                  ? { backgroundColor: "#00ACEC", color: "white" }
                  : {}
              }
            >
              Bu gün
            </div>
          </div>
          <div className="in-english date-tomorrow d-flex justify-content-center align-items-center">
            <div
              onClick={() => setDateSelected(tomorrow)}
              style={
                dateSelected === tomorrow
                  ? { backgroundColor: "#00ACEC", color: "white" }
                  : {}
              }
            >
              Sabah
            </div>
          </div>
          <select
            className="date-custom change-date"
            onChange={(e) => setDateSelected(e.target.value)}
            onClick={() => setOptionOne(!optionOne)}
            style={
              optionOne
                ? { borderRadius: "0 20px 0 0" }
                : { borderRadius: "0 50px 50px 0" }
            }
          >
            <option value={today} defaultValue>
              {today}
            </option>
            <option value={tomorrow}>{tomorrow}</option>
            <option value={tomorrow2}>{tomorrow2}</option>
            <option value={tomorrow3}>{tomorrow3}</option>
            <option value={tomorrow4}>{tomorrow4}</option>
          </select>
        </div>
        {props.selectedCinemaId === undefined ||
        props.selectedCinemaId === "" ? (
          <>
            <select
              className="filter-cinemas change-cinema"
              onChange={(e) => setSelectedCinemaId(e.target.value)}
              onClick={() => setOptionTwo(!optionTwo)}
              style={
                optionTwo
                  ? { borderRadius: "20px 20px 0 0" }
                  : { borderRadius: "20px" }
              }
            >
              <option value="" defaultValue>
                Kinoteatrlar
              </option>
              {cinemaData?.map((cinema) => (
                <option key={cinema.id} value={cinema.id}>
                  {cinema.name}
                </option>
              ))}
            </select>
            <select
              className="filter-lang change-lang"
              onChange={(e) => setSelectedLanguage(e.target.value)}
              onClick={() => setOptionThree(!optionThree)}
              style={
                optionThree
                  ? { borderRadius: "20px 20px 0 0" }
                  : { borderRadius: "20px" }
              }
            >
              <option value="">Bütün dillərdə</option>
              <option value="Az">Azərbaycanca</option>
              <option value="Rus">На русском</option>
              <option value="Eng">In English</option>
              <option value="Tur">Türkçe</option>
            </select>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="container">
        <div className="today-header text-center">
          {dateSelected === today
            ? "Bu gün "
            : dateSelected === tomorrow
            ? "Sabah "
            : ""}
          ({dateSelected})
        </div>
        {loading ? (
          <div className="loading text-center">Seanslar yüklənir. . .</div>
        ) : sessions.length === 0 ? (
          <div className="loading text-center">
            Seçiminizə uyğun seans tapılmadı. Zəhmət olmasa, birazdan yenidən
            cəhd edin,
          </div>
        ) : (
          <Table responsive>
            <thead>
              <tr>
                <th className="column-film">FILM</th>
                <th className="column-session">SEANSLAR</th>
                <th className="column-cinema">KINOTEATR</th>
                <th className="column-hall">ZAL</th>
                <th className="column-format">FORMAT</th>
                <th className="column-price">QİYMƏT</th>
                <th className="column-buy text-center">ALMAQ</th>
              </tr>
            </thead>
            <tbody>
              {!!sessions &&
                sessions?.map((item) => (
                  <tr key={item.id}>
                    <td className="row-film">
                      <Link to={`/moviedetail?id=${item.movie.id}`}>
                        {item.movie.name}
                      </Link>
                    </td>
                    <td className="row-session">{item.start}</td>
                    <td className="row-cinema">
                      <Link to={`/moviedetail?id=${item.movie.id}`}>
                        {item.hall.cinema.name}
                      </Link>
                    </td>
                    <td className="row-hall">{item.hall.name}</td>
                    <td className="row-format">
                      {item.sessionFormats?.map(({ format }) => (
                        <span key={format.id}>
                          <img
                            className="format-icon"
                            src={format.icon}
                            alt="format"
                          ></img>
                        </span>
                      ))}
                    </td>
                    <td className="row-price">
                      {item.hall.cinema.tariffs?.find(
                        (tariff) =>
                          tariff.startTime <= item.start &&
                          tariff.endTime >= item.start
                      ).price + ".00 AZN"}
                    </td>
                    <td className="row-buy text-center">
                      <div
                        onClick={() => {
                          zone.current.classList.add("active-zone");
                          zone.current.classList.remove("deactive-zone");
                          setSelectedSessionId(item.id);
                        }}
                        className="buy-ticket"
                        dataid={item.id}
                      >
                        Yerlər
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
        <a
          href="https://www.pashabank.az/lang,az/"
          target="_blank"
          rel="noreferrer"
          className="logo-reklam d-flex justify-content-center align-items-center pt-4 pb-2"
        >
          <img
            className="img-fluid"
            src="https://www.cinemaplus.az/site/templates/images/pb-aze.png"
            alt="logo-pashabank"
          ></img>
        </a>
      </div>
      <div ref={zone} className="zone" id="zone-buy">
        <div className="select-zone d-flex flex-column justify-content-between   align-items-center">
          <div className="zone-header d-flex flex-column justify-content-center align-items-center">
            <h6>{selectedSession && selectedSession.movie.name}</h6>
            <h6>
              {selectedSession &&
                dateFormat(selectedSession.date, "dd.mm.yyyy")}
              , {selectedSession && selectedSession.start.slice(0, 5)}
            </h6>
            <h6>
              {selectedSession && selectedSession.hall.cinema.name},{" "}
              {selectedSession && selectedSession.hall.name}
            </h6>
            <div className="row-format">
              {selectedSession &&
                selectedSession.movie.movieFormats?.map(({ format }) => (
                  <span key={format.id}>
                    <img
                      className="format-icon"
                      src={format.icon}
                      alt="format"
                    ></img>
                  </span>
                ))}
            </div>
          </div>
          <div className="zone-body d-flex flex-column justify-content-end align-items-center gap-1 pt-3">
            {selectedSession && <Seat selectedSession2={selectedSession} />}
            <div className="screen-text">EKRAN</div>
            <div className="zone-screen"></div>
          </div>
          <div className="zone-footer row pt-3">
            <div className="seats-color col-12 d-flex flex-wrap justify-content-center align-items-center pb-4 gap-4">
              <div>
                <span className="empty-seat"></span>
                <h6>Boş yerlər</h6>
              </div>
              <div>
                <span className="selected-seat"></span>
                <h6>Seçilmiş yerlər</h6>
              </div>
              <div>
                <span className="busy-seat"></span>
                <h6>Məşğul yerlər</h6>
              </div>
              {seatType &&
                seatType?.map((type) =>
                  !!selectedSession &&
                  selectedSession.hall.seats?.some(
                    (x) => x.seatTypeId === type.id
                  ) ? (
                    <div key={type.id}>
                      <span className={`seat${type.id}`}></span>
                      <h6>{type.name}</h6>
                    </div>
                  ) : (
                    ""
                  )
                )}
            </div>
            <div className="total-amount col-md-7 d-flex flex-column justify-content-center align-items-end">
              <p className="total-title">Umumi mebleg:</p>
              <p className="total-price">{totalPay} AZN</p>
            </div>
            <div className="payment-button col-md-5 d-flex flex-column justify-content-center align-items-end">
              <div to="#" onClick={() => addTicket(tickets)}>
                Təsdiqləmək
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              zone.current.classList.remove("active-zone");
              zone.current.classList.add("deactive-zone");
            }}
            className="zone-close"
          >
            <span>X</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Session;
