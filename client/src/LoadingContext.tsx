import React, { createContext, FC, useContext, useState } from "react";

interface Context {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  recordedVoices: never[];
  setRecordedVoices: React.Dispatch<React.SetStateAction<never[]>>;
}

const LoadingContext = createContext<Context>({} as Context);

// component - using by App.tsx - it provides user info to all components
export const LoadingProvider: FC = (props) => {
  const [loading, setLoading] = useState(false);
  const [recordedVoices, setRecordedVoices] = useState([]);

  return (
    <LoadingContext.Provider
      value={{ loading, setLoading, recordedVoices, setRecordedVoices }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

// custom hook (getter)
export const useLoading = () => {
  return useContext(LoadingContext);
};
