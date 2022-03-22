import React from "react";
import { useLoading } from "../LoadingContext";

const Loading = () => {
  const { loading } = useLoading();

  return <div>{loading ? <div>Loading</div> : <div>Loaded</div>}</div>;
};

export default Loading;
