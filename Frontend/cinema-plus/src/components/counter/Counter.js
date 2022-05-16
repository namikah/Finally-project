import React, { useState } from "react";
import { useContsantContext } from "../../context/constant";
import "./counter.scss";
function Counter() {
  const [counter, setCounter] = useState(15);
  const [{ setIsCounter }] = useContsantContext(false);

  React.useEffect(() => {
    if (counter > 0) setTimeout(() => setCounter(counter - 1), 1000);
    else {
      setIsCounter(false);
    }
  }, [counter,setIsCounter]);

  return <div id="deadline-for-payment">{counter}</div>;
}

export default Counter;
