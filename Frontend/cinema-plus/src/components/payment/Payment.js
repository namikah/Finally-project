import axios from "axios";
import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { ticketService } from "../../API/services/ticketService";
import { useContsantContext } from "../../context/constant";
import "./payment.scss";

function Payment({customer}) {
  const [{ totalPay }] = useContsantContext(0);
  const [{ tickets, setTickets }] = useContsantContext([]);
  console.log(customer);

  async function handleToken(token) {
    axios
      .post("https://localhost:44392/api/Payment", {
        email: token.email,
        source: token.id,
        amount: totalPay * 100,
        currency: "AZN",
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "succeeded") {
          tickets.forEach(element => {
            element.customer=customer;
          });
          console.log(tickets);
          ticketService
          .postTickets(tickets)
          .then((result) => {
            console.log("succes");
            console.log(result);
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
    <StripeCheckout
      stripeKey="pk_test_51KyIycFgS0jlrauJhLe4fMYZyLYW5OoxiZbIpDhL2a1uOI3rKZ8SoOOGwbIK1159D7aM8sdfD4eu3bgoUXZpTTCH00yvx67fmv"
      token={handleToken}
      amount={totalPay * 100}
      name="Pasha Bank"
    />
  );
}

export default Payment;
