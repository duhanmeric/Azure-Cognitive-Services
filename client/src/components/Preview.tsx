import React, { useEffect, useState } from "react";
import { useLoading } from "../LoadingContext";

const Preview = () => {
  const { recordedAudios } = useLoading();

  useEffect(() => {
    console.log(recordedAudios);
  }, [recordedAudios]);

  return (
    <div className="preview">
      <p>Your audios</p>
      {recordedAudios.map((rec: any) => (
        <audio key={rec.id} controls>
          <source src={rec.file} type="audio/mp3" />
        </audio>
      ))}
    </div>
  );
};

export default Preview;
