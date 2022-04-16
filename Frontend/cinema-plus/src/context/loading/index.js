import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext([]);

function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [localLogin, setLocalLogin] = useState(localStorage.getItem("login"));

  return (
    <LoadingContext.Provider value={[{ loading, setLoading, localLogin, setLocalLogin }]}>
      {children}
    </LoadingContext.Provider>
  );
}

const useLoadingContext = () => {
  const loadingContext = useContext(LoadingContext);
  return loadingContext;
};

export { useLoadingContext, LoadingProvider };
