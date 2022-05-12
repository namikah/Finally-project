import { range } from "range";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sessionService } from "../../API/services/sessionService";
import { useContsantContext } from "../../context/constant";
import { useLoadingContext } from "../../context/loading";
import "./seat.scss";

function Seat({ session }) {
  const [{ totalPay, setTotalPay }] = useContsantContext(0);
  const [{ maxSeatSelected, setMaxSeatSelected }] = useContsantContext(0);
  const [{ tickets, setTickets }] = useContsantContext([]);
  const [{ loading, setLoading }] = useLoadingContext(false);
  const [selectedSession, setSelectedSession] = useState(session);

  const getSelectedSession = useCallback((id) => {
    setLoading(true);
    sessionService.getSessionById(id).then((res) => {
      setSelectedSession(res.data);
      setLoading(false);
      setMaxSeatSelected(0);
      setTotalPay(0);
      setTickets([]);
    });
  }, [setLoading,setMaxSeatSelected,setTickets,setTotalPay]);

  useEffect(() => {
    getSelectedSession(session.id);
  }, [getSelectedSession, session.id]);

  const selectedSeat = useCallback(
    (e, seat, session) => {
      const ticket = {
        Price: 11,
        Seat: seat,
        Session: session,
        Customer: { name: "", surname: "", Gender: "Male" },
        IsDeleted: false,
      };

      if (e.target.classList.contains("selected")) {
        e.target.classList.remove("selected");
        setMaxSeatSelected(maxSeatSelected - 1);
        setTotalPay(totalPay - ticket.Price);
        let newTicketList = tickets.filter(({ Seat }) => Seat.id !== seat.id);
        setTickets(newTicketList);
      } else {
        if (maxSeatSelected < 5) {
          e.target.classList.add("selected");
          setMaxSeatSelected(maxSeatSelected + 1);
          setTotalPay(totalPay + ticket.Price);
          setTickets([...tickets, ticket]);
        }
      }
      console.log(tickets);
    },
    [
      maxSeatSelected,
      setTotalPay,
      totalPay,
      setTickets,
      tickets,
      setMaxSeatSelected
    ]
  );

  return (
    <>
      {loading ? (
        <div className="loading text-center">Yerlər yüklənir. . .</div>
      ) : (
        range(1, selectedSession && selectedSession.hall.rowCount + 1).map(
          (i) => (
            <div
              key={i}
              className="d-flex justify-content-center align-items-center gap-2"
            >
              {selectedSession &&
                selectedSession.hall.seats?.map((seat) =>
                  seat.row === i ? (
                    <div
                      key={seat.id}
                      style={
                        seat.seatTypeId === 1
                          ? {
                              backgroundColor: "white",
                              color: "rgb(0 0 0 / 60%)",
                            }
                          : seat.seatTypeId === 2
                          ? {
                              backgroundColor: "pink",
                              color: "rgb(0 0 0 / 60%)",
                            }
                          : seat.seatTypeId === 3
                          ? {
                              backgroundColor: "#49e1ea",
                              color: "rgb(0 0 0 / 60%)",
                            }
                          : {}
                      }
                      className={seat.seatTypeId === 4 ? "another" : ""}
                    >
                      <span
                        datatype={seat.seatType.name}
                        onClick={(e) => {
                          selectedSeat(e, seat, selectedSession);
                        }}
                      >
                        {seat.column}
                      </span>
                    </div>
                  ) : (
                    ""
                  )
                )}
            </div>
          )
        )
      )}
    </>
  );
}

export default Seat;
