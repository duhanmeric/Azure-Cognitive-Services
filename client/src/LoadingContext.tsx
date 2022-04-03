import React, { createContext, FC, useContext, useState } from "react";

interface Context {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  recordedAudios: never[];
  setRecordedAudios: React.Dispatch<React.SetStateAction<never[]>>;
  currentAudio: string;
  setCurrentAudio: React.Dispatch<React.SetStateAction<string>>;
}

const LoadingContext = createContext<Context>({} as Context);

// component - using by App.tsx - it provides user info to all components
export const LoadingProvider: FC = (props) => {
  const [loading, setLoading] = useState(false);
  const [recordedAudios, setRecordedAudios] = useState([]);
  const [currentAudio, setCurrentAudio] = useState("");

  return (
    <LoadingContext.Provider
      value={{
        currentAudio,
        setCurrentAudio,
        loading,
        setLoading,
        recordedAudios,
        setRecordedAudios,
      }}
    >
      {props.children}
    </LoadingContext.Provider>
  );
};

// custom hook (getter)
export const useLoading = () => {
  return useContext(LoadingContext);
};
