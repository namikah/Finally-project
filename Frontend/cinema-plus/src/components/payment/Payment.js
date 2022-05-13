import axios from "axios";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast, ToastContainer } from "react-toastify";
import { ticketService } from "../../API/services/ticketService";
import { useContsantContext } from "../../context/constant";
import Counter from "../counter/Counter";
import "./payment.scss";

function Payment({ customer }) {
  const [{ totalPay, setTotalPay }] = useContsantContext(0);
  const [{ tickets, setTickets }] = useContsantContext([]);
  const [{ setMaxSeatSelected }] = useContsantContext(0);

  useEffect(() => {
    document.querySelector(".StripeCheckout").click();
  }, []);
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
        if (res.data.status === "succeeded") {
          tickets.forEach((element) => {
            element.customer = customer;
          });

          ticketService
            .putTickets(tickets)
            .then((result) => {
              console.log(result);
              setTickets([]);
              setMaxSeatSelected(0);
              setTotalPay(0);
              toast.success("Ödənişiniz uğurla tamamlandı.");
              setTimeout(() => {
                document.querySelector(".zone-close").click();
              }, 6000);
            })
            .catch((rest) => {
              toast.error("Uğursuz ödəniş. Yenidən cəhd edin");
              setTimeout(() => {
                document.querySelector(".zone-close").click();
              }, 6000);
            });
        } else {
          toast.error("Uğursuz ödəniş. Yenidən cəhd edin");
          setTimeout(() => {
            document.querySelector(".zone-close").click();
          }, 6000);
        }
      })
      .catch(() => {
        toast.error("Uğursuz ödəniş. Yenidən cəhd edin");
        setTimeout(() => {
          document.querySelector(".zone-close").click();
        }, 6000);
      });
  }

  return (
    <>
      <Counter />
      <StripeCheckout
        stripeKey="pk_test_51KyIycFgS0jlrauJhLe4fMYZyLYW5OoxiZbIpDhL2a1uOI3rKZ8SoOOGwbIK1159D7aM8sdfD4eu3bgoUXZpTTCH00yvx67fmv"
        token={handleToken}
        amount={totalPay * 100}
        name="Pasha Bank"
      />
      <ToastContainer
        autoClose={4000}
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default Payment;
