import { range } from "range";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContsantContext } from "../../context/constant";
import "./seat.scss";

function Seat({ selectedSession }) {
  const [maxSeatSelected, setMaxSeatSelected] = useState(0);
  const [{ totalPay, setTotalPay }] = useContsantContext(0);
  const [{ tickets, setTickets }] = useContsantContext([]);

  useEffect(() => {
    setMaxSeatSelected(0);
    setTotalPay(0);
    setTickets([]);
  }, [selectedSession, setTotalPay, setTickets]);

  const selectedSeat = useCallback(
    (e, seat) => {
      const ticket = {
        Price: 7,
        Seat: seat,
        Session: selectedSession,
        Customer: { name: "Namik", surname: "Heydarov", Gender: "Male" },
      };

      if (e.target.classList.contains("selected")) {
        e.target.classList.remove("selected");
        setMaxSeatSelected(maxSeatSelected - 1);
        setTotalPay(totalPay - ticket.Price);
        let newTicketList = tickets.filter(({Seat}) => Seat.id !== seat.id);
        setTickets(newTicketList);
      } else {
        if (maxSeatSelected < 5) {
          e.target.classList.add("selected");
          setMaxSeatSelected(maxSeatSelected + 1);
          setTotalPay(totalPay + ticket.Price);
          setTickets([...tickets, ticket]);
        }
      }
      console.log(maxSeatSelected);
    },
    [maxSeatSelected, setTotalPay, totalPay]
  );

  //   const setTicket = (seat, inc, dec) => {
  // const { name, value } = e.target;
  // setProducts({ ...products, [name]: value });

  //     const ticket = {
  //       Price: 5,
  //       Seat: seat,
  //       Session: selectedSession,
  //       Customer: { name: "Namik", surname: "Heydarov", Gender: "Male" },
  //     };
  //     setTickets([...tickets, ticket]);
  //   };

  console.log(tickets);

  return (
    <>
      {range(1, selectedSession && selectedSession.hall.rowCount + 1).map(
        (i) => (
          <div
            key={i}
            className="d-flex justify-content-center align-items-center gap-2"
          >
            {selectedSession &&
              selectedSession.hall.seats?.map((seat) =>
                seat.row === i ? (
                  <Link
                    to={"#"}
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
                        selectedSeat(e, seat);
                        // setTicket(seat);
                      }}
                    >
                      {seat.column}
                    </span>
                  </Link>
                ) : (
                  ""
                )
              )}
          </div>
        )
      )}
    </>
  );
}

export default Seat;
