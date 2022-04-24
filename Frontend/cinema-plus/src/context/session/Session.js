import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { sessionService } from "../../API/services/sessionService";
import { useLoadingContext } from "../loading";

const SessionContext = createContext([]);

function SessionProvider({ children }) {
  const [sessionData, setSessionData] = useState([]);
  const [{ loading, setLoading }] = useLoadingContext([]);

  const getData = useCallback(() => {
    setLoading(false);
    sessionService.getSession().then((res) => {
      setLoading(true);
      setSessionData(res.data);
    });
  }, [setLoading]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <SessionContext.Provider value={[{ sessionData, setSessionData }]}>
      {children}
    </SessionContext.Provider>
  );
}

const useSessionContext = () => {
  const sessionContext = useContext(SessionContext);
  return sessionContext;
};

export { useSessionContext, SessionProvider };
