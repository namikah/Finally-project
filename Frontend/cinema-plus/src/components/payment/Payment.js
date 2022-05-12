import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast, ToastContainer } from "react-toastify";
import { ticketService } from "../../API/services/ticketService";
import { useContsantContext } from "../../context/constant";
import "./payment.scss";

function Payment({ customer }) {
  const [{ totalPay, setTotalPay }] = useContsantContext(0);
  const [{ tickets, setTickets }] = useContsantContext([]);
  const [{ maxSeatSelected, setMaxSeatSelected }] = useContsantContext(0);
  const { push } = useHistory();

  async function handleToken(token) {
    toast.info("Ödənişiniz yoxlanılır. Zəhmət olmasa gözləyin", {
      position: toast.POSITION.TOP_CENTER,
    });
    axios
      .post("https://localhost:44392/api/Payment", {
        email: token.email,
        source: token.id,
        amount: totalPay * 100,
        currency: "AZN",
        name: `${customer.name} ${customer.surname}`,
      })
      .then((res) => {
        console.log(res);

        if (res.data.status === "succeeded") {
          tickets.forEach((element) => {
            element.customer = customer;
          });
          console.log(tickets);

          ticketService
            .postTickets(tickets)
            .then((result) => {
              console.log("succes");
              console.log(result);
              setTickets([]);
              setMaxSeatSelected(0);
              setTotalPay(0);
              toast.success("Ödənişiniz uğurla tamamlandı.", {
                position: toast.POSITION.TOP_CENTER,
              });
              setTimeout(() => {
                document.querySelector(".zone-close").click();
              }, 6000);
            })
            .catch((rest) => {
              console.log("catch");
              console.log(rest);
            });
        } else {
        }
      });
  }

  return (
    <>
      <StripeCheckout
        stripeKey="pk_test_51KyIycFgS0jlrauJhLe4fMYZyLYW5OoxiZbIpDhL2a1uOI3rKZ8SoOOGwbIK1159D7aM8sdfD4eu3bgoUXZpTTCH00yvx67fmv"
        token={handleToken}
        amount={totalPay * 100}
        name="Pasha Bank"
      />
      <ToastContainer autoClose={4000} />
    </>
  );
}

export default Payment;
