import { range } from "range";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sessionService } from "../../API/services/sessionService";
import { tariffService } from "../../API/services/tariffService";
import { ticketService } from "../../API/services/ticketService";
import { useContsantContext } from "../../context/constant";
import { useLoadingContext } from "../../context/loading";
import "./seat.scss";

function Seat({ session }) {
  const [{ totalPay, setTotalPay }] = useContsantContext(0);
  const [{ maxSeatSelected, setMaxSeatSelected }] = useContsantContext(0);
  const [{ tickets, setTickets }] = useContsantContext([]);
  const [{ loading, setLoading }] = useLoadingContext(false);
  const [selectedSession, setSelectedSession] = useState(session);
  const [tariff, setTariff] = useState([]);
  const [existTickets, setExistTickets] = useState([]);

  const getSelectedSession = useCallback(
    (id) => {
      setLoading(true);
      sessionService.getSessionById(id).then((res) => {
        setSelectedSession(res.data);
        setLoading(false);
        setMaxSeatSelected(0);
        setTotalPay(0);
        setTickets([]);
      });
    },
    [setLoading, setMaxSeatSelected, setTickets, setTotalPay]
  );

  useEffect(() => {
    getSelectedSession(session.id);
  }, [getSelectedSession, session.id]);

  const getTariff = useCallback(() => {
    tariffService.getTariff().then((res) => {
      setTariff(res.data);
    });
  }, [setTariff]);

  useEffect(() => {
    getTariff();
  }, [getTariff]);

  const getExistTickets = useCallback(() => {
    ticketService.getTicket().then((res) => {
      setExistTickets(res.data);
    });
  }, [setExistTickets]);

  useEffect(() => {
    getExistTickets();
  }, [getExistTickets]);

  const selectedSeat = useCallback(
    (e, seat, session, tariffs) => {
      ticketService.getTicket().then(({ data }) => {
        if (
          data.some((x) => x.sessionId === session.id && x.seatId === seat.id)
        ) {
          e.target.classList.remove("selected");
          e.target.classList.remove("empty-seat");
          e.target.classList.add("busy-seat");
          e.target.style.pointerEvents = "none";
          toast.info("Bu yer artıq seçilmişdir.");
          return;
        } else {
          const ticket = {
            Price: tariffs.find(
              (x) =>
                x.cinemaId === session.hall.cinemaId &&
                x.startTime <= session.start &&
                x.endTime >= session.end &&
                x.seatType.id === seat.seatTypeId
            ).price,
            Seat: seat,
            Session: session,
            Customer: { name: "", surname: "", Gender: "Male" },
            IsDeleted: false,
          };
          if (e.target.classList.contains("selected")) {
            if (seat.seatType.id === 2) {
              if (Math.round(seat.column) % 2 === 0) {
                e.target.previousSibling.classList.remove("selected");
              } else {
                e.target.nextSibling.classList.remove("selected");
              }
              e.target.classList.remove("selected");
              setMaxSeatSelected(maxSeatSelected - 2);
              setTotalPay(totalPay - ticket.Price * 2);
              setTickets([...tickets, ticket]);
              if (Math.round(seat.column) % 2 === 0) {
                let newTicketList = tickets.filter(
                  ({ Seat }) =>
                    Seat.id !== seat.id && Seat.id != Math.round(seat.id) - 1
                );
                setTickets(newTicketList);
              } else {
                let newTicketList = tickets.filter(
                  ({ Seat }) =>
                    Seat.id !== seat.id && Seat.id != Math.round(seat.id) + 2
                );
                setTickets(newTicketList);
              }
            } else {
              e.target.classList.remove("selected");
              setMaxSeatSelected(maxSeatSelected - 1);
              setTotalPay(totalPay - ticket.Price);
              let newTicketList = tickets.filter(
                ({ Seat }) => Seat.id !== seat.id
              );
              setTickets(newTicketList);
            }
          } else {
            if (maxSeatSelected < 6) {
              if (seat.seatType.id === 2) {
                if (maxSeatSelected > 4) {
                  toast.info("Siz maksimum 6 yer seçə bilərsiniz");
                } else {
                  if (Math.round(seat.column) % 2 === 0) {
                    e.target.previousSibling.classList.add("selected");
                  } else {
                    e.target.nextSibling.classList.add("selected");
                  }
                  e.target.classList.add("selected");
                  setMaxSeatSelected(maxSeatSelected + 2);
                  setTotalPay(totalPay + ticket.Price * 2);
                  setTickets([...tickets, ticket]);
                }
              } else {
                e.target.classList.add("selected");
                setMaxSeatSelected(maxSeatSelected + 1);
                setTotalPay(totalPay + ticket.Price);
                setTickets([...tickets, ticket]);
              }
            } else {
              toast.info("Siz maksimum 6 yer seçə bilərsiniz");
            }
          }
        }
      });
    },
    [
      maxSeatSelected,
      setTotalPay,
      totalPay,
      setTickets,
      tickets,
      setMaxSeatSelected,
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
                selectedSession.hall.seats?.map((seat, index) =>
                  seat.row === i ? (
                    existTickets.some(
                      (x) =>
                        x.seatId === seat.id &&
                        x.sessionId === selectedSession.id
                    ) ? (
                      <div
                        className="busy-seat"
                        key={seat.id}
                        datatype={seat.seatType.name}
                      >
                        {seat.column}
                      </div>
                    ) : (
                      <div
                        onClick={(e) => {
                          seat.seatTypeId !== 4
                            ? selectedSeat(e, seat, selectedSession, tariff)
                            : toast.info(
                                "Bu yerlər yalnız kassada alına bilər!"
                              );
                        }}
                        key={seat.id}
                        datatype={seat.seatType.name}
                        style={
                          seat.seatTypeId === 4
                            ? {
                                background: `url(${seat.seatType.color}) center no-repeat`,
                                backgroundSize: "80%",
                                backgroundColor: "white",
                              }
                            : {
                                backgroundColor: seat.seatType.color,
                                color: "rgb(0 0 0 / 60%)",
                              }
                        }
                        className={
                          seat.seatTypeId === 4
                            ? "empty-seat another"
                            : "empty-seat"
                        }
                      >
                        {seat.column}
                      </div>
                    )
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
