import React from "react";
import { useLoading } from "../LoadingContext";
import LoadingGif from "../assets/loading.gif";

const Loading = () => {
  const { loading } = useLoading();

  return (
    <div>
      {loading ? (
        <img className="loading" src={LoadingGif} alt="Loading" />
      ) : (
        <div className="loadingDiv"></div>
      )}
    </div>
  );
};

export default Loading;
