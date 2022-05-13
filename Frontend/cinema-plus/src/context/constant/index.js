import React, { createContext, useContext, useState } from "react";

const ConstantContext = createContext([]);

function ConstantProvider({ children }) {
  const [totalPay, setTotalPay] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [maxSeatSelected, setMaxSeatSelected] = useState(0);
  const [isCounter, setIsCounter] = useState(false);

  return (
    <ConstantContext.Provider
      value={[
        {
          totalPay,
          setTotalPay,
          maxSeatSelected,
          setMaxSeatSelected,
          tickets,
          setTickets,
          isCounter,
          setIsCounter
        },
      ]}
    >
      {children}
    </ConstantContext.Provider>
  );
}

const useContsantContext = () => {
  const totalPay = useContext(ConstantContext);
  return totalPay;
};

export { useContsantContext, ConstantProvider };
