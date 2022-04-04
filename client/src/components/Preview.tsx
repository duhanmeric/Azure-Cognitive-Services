import React, { useEffect } from "react";
import axios from "axios";
import { useLoading } from "../LoadingContext";

const Preview = () => {
  const { recordedAudios, setRecordedAudios } = useLoading();

  const URL = "https://bulut-final.herokuapp.com/audio";

  useEffect(() => {
    axios.get(URL).then((response) => {
      setRecordedAudios(response.data);
    });
  }, [setRecordedAudios]);

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
