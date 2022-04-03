import React, { useEffect, useState } from "react";
import { useLoading } from "../LoadingContext";

const Preview = () => {
  const { recordedAudios } = useLoading();
  const [preLoadedAudios, setPreLoadedAudios] = useState<any>([]);

  useEffect(() => {
    function importFile() {
      setPreLoadedAudios([]);
      recordedAudios.forEach(async (element) => {
        await import(`../audios/${element}`)
          .then((audioFile: any) => {
            setPreLoadedAudios((p: any) => [
              ...p,
              {
                id: (Math.random() * 100000).toString(),
                file: audioFile.default,
              },
            ]);
          })
          .catch((err) => {
            return;
          });
      });
    }
    importFile();
  }, [recordedAudios]);

  return (
    <div className="preview">
      <p>Your audios</p>
      {preLoadedAudios.map((rec: any) => (
        <audio key={rec.id} controls>
          <source src={rec.file} type="audio/mp3" />
        </audio>
      ))}
    </div>
  );
};

export default Preview;
