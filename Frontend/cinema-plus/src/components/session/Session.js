import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Input, Table } from "reactstrap";
import "./session.scss";
import dateFormat from "dateformat";
import { useLoadingContext } from "../../context/loading";
import { seatTypeService } from "../../API/services/seatTypeService";
import { cinemaService } from "../../API/services/cinemaService";
import Seat from "../seat/Seat";
import { useContsantContext } from "../../context/constant";
import Payment from "../payment/Payment";
import { ticketService } from "../../API/services/ticketService";
import { toast, ToastContainer } from "react-toastify";
import { languageService } from "../../API/services/languageService";
import axios from "axios";
import { tariffService } from "../../API/services/tariffService";
import { seatService } from "../../API/services/seatService";

const customerDto = {
  name: "",
  surname: "",
  gender: "Male",
};

function Session(props) {
  let date = new Date();
  let today = dateFormat(date.setDate(date.getDate()), "dd.mm.yyyy");
  let tomorrow = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow2 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow3 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow4 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");

  const [{ loading }] = useLoadingContext();
  const [sessionData, setSessionData] = useState([]);
  const [optionOne, setOptionOne] = useState(false);
  const [optionTwo, setOptionTwo] = useState(false);
  const [optionThree, setOptionThree] = useState(false);
  const [dateSelected, setDateSelected] = useState(today);
  const [selectedSessionId, setSelectedSessionId] = useState();
  const [existSession, setExistSession] = useState({});
  const [seatType, setSeatType] = useState();
  const [tariffs, setTariffs] = useState([]);
  const [seats, setSeats] = useState([]);
  const [cinemaData, setCinemaData] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [customer, setCustomer] = useState(customerDto);
  const [{ totalPay, setTotalPay }] = useContsantContext(0);
  const [{ tickets, setTickets }] = useContsantContext([]);
  const [{ isCounter, setIsCounter }] = useContsantContext(false);
  const [{ setMaxSeatSelected }] = useContsantContext(0);
  const [languageData, setLanguageData] = useState([]);
  const zone = useRef();

  const getCinemas = useCallback(() => {
    cinemaService.getCinema().then((res) => {
      setCinemaData(res.data);
    });
  }, []);

  useEffect(() => {
    getCinemas();
  }, [getCinemas]);

  const getLanguages = useCallback(async () => {
    await languageService.getLanguage().then((res) => {
      setLanguageData(res.data);
    });
  }, []);

  useEffect(() => {
    getLanguages();
  }, [getLanguages]);

  const getData = useCallback(() => {
    axios.request("https://localhost:44392/api/session").then((res) => {
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
    selectedSessionId &&
      axios
        .request("https://localhost:44392/api/session/" + selectedSessionId)
        .then((res) => {
          setExistSession(res.data);
        });
    return sessions?.find((x) => x.id === selectedSessionId);
  }, [sessions, selectedSessionId]);

  const getTariffs = useCallback(() => {
    tariffService.getTariff().then((res) => {
      setTariffs(res.data);
    });
  }, [setTariffs]);

  useEffect(() => {
    getTariffs();
  }, [getTariffs]);

  const getSeats = useCallback(() => {
    seatService.getSeats().then((res) => {
      setSeats(res.data);
    });
  }, [setSeats]);

  useEffect(() => {
    getSeats();
  }, [getSeats]);

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
      s.language.shortName.includes(selectedLanguage)
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

  const getElementValues = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleAddTicketPending = (tickets) => {
    tickets.forEach((element) => {
      element.customer = customer;
    });

    setIsCounter(false);
    ticketService.postTickets(tickets).then(({ data }) => {
      if (data) {
        if (!isCounter) return;
        toast.success("??d??ni??iniz u??urla tamamland??.");
      } else {
        toast.error("U??ursuz ??d??ni??. Yenid??n c??hd edin");
      }
      setTickets([]);
      setMaxSeatSelected(0);
      setTotalPay(0);
      setIsCounter(false);
      setTimeout(() => {
        document.querySelector(".zone-close").click();
      }, 6000);
    });
  };
  console.log(seats);
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
              Bu g??n
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
              <option value="">B??t??n dill??rd??</option>
              {languageData?.map(({ id, shortName, name }) => (
                <option key={id} value={shortName}>
                  {name}
                </option>
              ))}
            </select>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="container">
        <div className="today-header text-center">
          {dateSelected === today
            ? "Bu g??n "
            : dateSelected === tomorrow
            ? "Sabah "
            : ""}
          ({dateSelected})
        </div>
        {loading ? (
          <div className="loading text-center">Seanslar y??kl??nir. . .</div>
        ) : sessions.length === 0 ? (
          <div className="loading text-center">
            Se??iminiz?? uy??un seans tap??lmad??. Z??hm??t olmasa, birazdan yenid??n
            c??hd edin,
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
                <th className="column-price">Q??YM??T</th>
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
                      <Link to={`/cinema?id=${item.hall.cinemaId}`}>
                        {item.hall.cinema.name}
                      </Link>
                    </td>
                    <td className="row-hall">{item.hall.name}</td>
                    <td className="row-format">
                      <span>
                        <img
                          className="format-icon"
                          src={item.format.icon}
                          alt="format"
                        ></img>
                      </span>
                      <span>
                        <img
                          className="format-icon"
                          src={item.language.icon}
                          alt="language"
                        ></img>
                      </span>
                    </td>
                    <td className="row-price">
                      {!!tariffs && tariffs.length !== 0
                        ? tariffs?.find(
                            (tariff) =>
                              tariff.cinemaId === item.hall.cinemaId &&
                              tariff.startTime <= item.start &&
                              tariff.endTime >= item.end &&
                              Math.round(tariff.startDayOfWeek) <=
                                Math.round(
                                  new Date(item.date.toString()).getDay() === 0
                                    ? 7
                                    : new Date(item.date.toString()).getDay()
                                ) &&
                              Math.round(tariff.endDayOfWeek) >=
                                Math.round(
                                  new Date(item.date.toString()).getDay() === 0
                                    ? 7
                                    : new Date(item.date.toString()).getDay()
                                ) &&
                              item.formatId === tariff.formatId &&
                              seats?.find((x) =>
                                seats?.some(
                                  (x) =>
                                    x.hallId === item.hallId &&
                                    x.seatType.name.includes("Normal")
                                )
                                  ? x.hallId === item.hallId &&
                                    x.seatType.name.includes("Normal")
                                  : x.hallId === item.hallId
                              )?.seatTypeId === tariff.seatType.id
                          )?.price + ".00 AZN"
                        : " T??yin edilm??yib "}
                    </td>
                    <td className="row-buy text-center">
                      {dateFormat(item.date, "yyyy.mm.dd") <=
                        dateFormat(
                          date.setDate(date.getDate()),
                          "yyyy.mm.dd"
                        ) &&
                      tariffs &&
                      tariffs?.length !== 0 ? (
                        <div
                          className="buy-ticket"
                          dataid={item.id}
                          onClick={(e) => {
                            zone.current.classList.add("active-zone");
                            zone.current.classList.remove("deactive-zone");
                            setSelectedSessionId(item.id);
                          }}
                        >
                          Yerl??r
                        </div>
                      ) : (
                        <div
                          className="buy-ticket"
                          dataid={item.id}
                          style={{
                            opacity: ".5",
                            pointerEvents: "none",
                            cursor: "default",
                          }}
                        >
                          Yerl??r
                        </div>
                      )}
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
        <ToastContainer
          autoClose={3000}
          position="top-center"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
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
              {selectedSession &&
                selectedSession.movie.movieLanguages?.map(({ language }) => (
                  <span key={language.id}>
                    <img
                      className="format-icon"
                      src={language.icon}
                      alt="language"
                    ></img>
                  </span>
                ))}
            </div>
          </div>

          <div className="zone-body d-flex flex-column justify-content-end align-items-center gap-1 pt-3">
            {selectedSession && <Seat session={selectedSession} />}
            <div className="screen-text">EKRAN</div>
            <div className="zone-screen"></div>
          </div>
          <div className="zone-footer row pt-3">
            <div className="seats-color col-12 d-flex flex-wrap justify-content-center align-items-center pb-4 gap-4">
              <div>
                <span className="empty-seat"></span>
                <h6>Bo?? yerl??r</h6>
              </div>
              <div>
                <span className="selected-seat"></span>
                <h6>Se??ilmi?? yerl??r</h6>
              </div>
              <div>
                <span className="busy-seat"></span>
                <h6>M??????ul yerl??r</h6>
              </div>
              {seatType &&
                seatType?.map((type) =>
                  !!existSession.hall &&
                  existSession.hall.seats?.some(
                    (x) => x.seatTypeId === type.id
                  ) ? (
                    <div key={type.id}>
                      <span
                        className={`seat${type.id}`}
                        style={
                          type.id === 4
                            ? {
                                background: `url(${type.color}) center no-repeat`,
                                backgroundSize: "80%",
                                backgroundColor: "white",
                              }
                            : {
                                backgroundColor: type.color,
                                color: "rgb(0 0 0 / 60%)",
                              }
                        }
                      ></span>
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
              {totalPay > 0 ? (
                <div
                  onClick={() => {
                    document
                      .querySelector("#customer-for-payment")
                      .classList.toggle("active");
                  }}
                >
                  T??sdiql??m??k
                </div>
              ) : (
                <div
                  style={{ pointerEvents: "none", backgroundColor: "#696969" }}
                >
                  T??sdiql??m??k
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              zone.current.classList.remove("active-zone");
              zone.current.classList.add("deactive-zone");
              setSelectedSessionId(0);
              setIsCounter(false);
              document
                .querySelector("#customer-for-payment")
                .classList.remove("active");
            }}
            className="zone-close"
          >
            <span>X</span>
          </div>
          {isCounter ? <Payment customer={customer} /> : ""}
          <div id="customer-for-payment">
            <Form className="text-center">
              <FormGroup>
                <label>Ad</label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="ad??n??z"
                  onChange={getElementValues}
                />
              </FormGroup>
              <FormGroup>
                <label>Soyad</label>
                <Input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="soyad??n??z"
                  onChange={getElementValues}
                />
              </FormGroup>
              <FormGroup>
                <label>Gender</label>
                <select
                  type="select"
                  name="gender"
                  id="gender"
                  placeholder="soyad??n??z"
                  onChange={getElementValues}
                >
                  <option>Male</option>
                  <option>female</option>
                </select>
              </FormGroup>
              <p>
                Qeyd: 'T??sdiql??' tu??una basd??qdan sonra, ??d??ni?? etm??k ??????n sizin{" "}
                <br /> <span>60</span> saniy??niz olacaq !
              </p>
              <Button
                className="btn btn-success"
                id="animate.css"
                onClick={(e) => {
                  document
                    .querySelector("#customer-for-payment")
                    .classList.remove("active");
                  handleAddTicketPending(tickets);
                  setIsCounter(true);
                }}
              >
                T??sdiql??
              </Button>
              <Button
                className="btn btn-danger"
                id="animate.css"
                onClick={(e) => {
                  document
                    .querySelector("#customer-for-payment")
                    .classList.remove("active");
                  setIsCounter(false);
                }}
              >
                ??mtina
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Session;
