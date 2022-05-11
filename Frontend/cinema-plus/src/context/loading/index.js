import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext([]);

function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(false);

  return (
    <LoadingContext.Provider
      value={[{ loading, setLoading, progress, setProgress }]}
    >
      {children}
    </LoadingContext.Provider>
  );
}

const useLoadingContext = () => {
  const loadingContext = useContext(LoadingContext);
  return loadingContext;
};

export { useLoadingContext, LoadingProvider };
