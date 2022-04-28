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
import { useSessionContext } from "../../context/session/Session";
import { range } from "range";
import { seatTypeService } from "../../API/services/seatTypeService";

function Session(props) {
  let date = new Date();
  let today = dateFormat(date.setDate(date.getDate()), "dd.mm.yyyy");
  let tomorrow = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow2 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow3 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow4 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");

  const [{ loading }] = useLoadingContext();
  const [{ sessionData }] = useSessionContext([]);
  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [dateSelected, setDateSelected] = useState(today);
  const [selectedSessionId, setSelectedSessionId] = useState();
  const [seatType, setSeatType] = useState();
  // const [selectedHallRowCount, setselectedHallRowCount] = useState(0);
  const zone = useRef();
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

  if (props.platinum !== undefined)
    sessions = sessions?.filter(
      (session) =>
        session.hall.name.includes("Platinum") ||
        session.hall.name.includes("VIP")
    );

  if (props.movieId !== undefined)
    sessions = sessions?.filter(
      (session) => session.movieId.toString() === props.movieId.toString()
    );

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
        <select
          className="filter-cinemas change-cinema"
          onChange={(e) => setDateSelected(e.target.value)}
          onClick={() => setOptionTwo(!optionTwo)}
          style={
            optionTwo
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "50px" }
          }
        >
          <option value={0} defaultValue>
            Kinoteatrlar
          </option>
        </select>
        <select
          className="filter-lang change-lang"
          onClick={() => setOptionThree(!optionThree)}
          style={
            optionThree
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "20px" }
          }
        >
          <option value="1">Bütün dillərdə</option>
          <option value="2">Azərbaycanca</option>
          <option value="3">На русском</option>
          <option value="4">In English</option>
          <option value="5">Türkçe</option>
        </select>
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
          <div className="loading text-center">Seans yoxdur</div>
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
              {sessions?.map((item) => (
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
                    {item.movie.movieFormats?.map(({ format }) => (
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
      <div ref={zone} className="zone">
        <div className="select-zone d-flex flex-column justify-content-between align-items-center">
          <div className="zone-header d-flex flex-column justify-content-center align-items-center">
            <h6>
              {selectedSession &&
                selectedSession.movie.name}
            </h6>
            <h6>
              {selectedSession &&
                dateFormat(
                  selectedSession.date,
                  "dd.mm.yyyy"
                )}
              ,{" "}
              {selectedSession &&
                selectedSession.start.slice(0, 5)}
            </h6>
            <h6>
              {selectedSession &&
                selectedSession.hall.cinema.name}
              ,{" "}
              {selectedSession &&
                selectedSession.hall.name}
            </h6>
            <div className="row-format">
              {selectedSession &&
                selectedSession.movie.movieFormats?.map(
                  ({ format }) => (
                    <span key={format.id}>
                      <img
                        className="format-icon"
                        src={format.icon}
                        alt="format"
                      ></img>
                    </span>
                  )
                )}
            </div>
          </div>
          <div className="zone-body d-flex flex-column justify-content-center align-items-center gap-1">
            {range(1, 3 + 1).map((i) => (
              <div
                key={i}
                className="d-flex justify-content-center align-items-center gap-1"
              >
                {selectedSession &&
                  selectedSession.hall.seats?.map((seat) =>
                    seat.row === i ? (
                      <Link
                        to={"#"}
                        key={seat.id}
                        style={
                          seat.seatTypeId === 1
                            ? { backgroundColor: "white", color: "#334e9e" }
                            : seat.seatTypeId === 2
                            ? { backgroundColor: "pink", color: "#334e9e" }
                            : seat.seatTypeId === 3
                            ? { backgroundColor: "#00acec", color: "#334e9e" }
                            : {}
                        }
                        className={seat.seatTypeId === 4 ? "another" : ""}
                      >
                        <span>{seat.column}</span>
                      </Link>
                    ) : (
                      ""
                    )
                  )}
              </div>
            ))}
          </div>
          <div className="zone-footer pt-3">
            <div className="seats-color d-flex flex-wrap justify-content-center align-items-center gap-4">
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
                  !!selectedSession && selectedSession.hall.seats?.some(
                    (x) => x.seatTypeId === type.id
                  ) ? (
                    <div>
                      <span className={`seat${type.id}`}></span>
                      <h6>{type.name}</h6>
                    </div>
                  ) : (
                    ""
                  )
                )}
            </div>
            <div className="col-8"></div>
            <div className="col-4"></div>
          </div>
          <div
            onClick={() => zone.current.classList.remove("active-zone")}
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
