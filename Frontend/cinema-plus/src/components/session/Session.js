import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { sessionService } from "../../API/services/sessionService";
import "./session.scss";
import dateFormat from "dateformat";
import { useLoadingContext } from "../../context/loading";

function Session(props) {
  const [{ loading, setLoading }] = useLoadingContext(false);
  const [optionOne, setOptionOne] = useState(false);
  const [sessionData, setSessionData] = useState([]);

  let date = new Date();
  let today = dateFormat(date.setDate(date.getDate()), "dd.mm.yyyy");
  let tomorrow = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow2 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow3 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");
  let tomorrow4 = dateFormat(date.setDate(date.getDate() + 1), "dd.mm.yyyy");

  const getData = useCallback(() => {
    setLoading(true);
    sessionService.getSession().then((res) => {
    setLoading(false);
    setSessionData(res.data);
    });
  }, [setSessionData,setLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  let sessions = sessionData;
  if (props.movieId !== undefined)
    sessions = sessionData?.filter(
      (session) => session.movieId.toString() === props.movieId.toString()
    );
  return (
    <section id="session">
      <div className="header-filter d-flex flex-wrap justify-content-center align-items-center gap-2 gap-lg-5 gap-md-3">
        <div className="in-english d-flex justify-content-center align-items-center">
          <Link to={"/"} data-date={today}>Bu gün</Link>
        </div>
        <div className="in-english d-flex justify-content-center align-items-center">
          <Link to={"/"} data-date={tomorrow}>
            Sabah
          </Link>
        </div>
        <select
          onMouseDown={() => setOptionOne(true)}
          onMouseLeave={() => setOptionOne(false)}
          style={
            optionOne
              ? { borderRadius: "20px 20px 0 0" }
              : { borderRadius: "20px" }
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
      <div className="container">
      {loading? ( <div className="loading text-center">Seanslar yüklənir. . .</div>) : (  <Table responsive>
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
                <td className="row-format d-flex">
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
                  <div className="buy-ticket">
                    <input
                      type="text"
                      value={"Yerlər"}
                      readOnly
                      disabled
                    ></input>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>)}
      </div>
    </section>
  );
}

export default Session;
