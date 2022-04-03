import React, { useState, useEffect } from "react";
import { useLoading } from "../LoadingContext";
import axios from "axios";
import Button from "./Button";
import UserInput from "./UserInput";

const Form = () => {
  const [textInput, setTextInput] = useState("");

  const { setLoading, setRecordedAudios, currentAudio, setCurrentAudio } =
    useLoading();

  const URL = "http://localhost:8080/audio";
  const headers = {
    "Content-Type": "application/json",
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (textInput.length === 0) return;
    setLoading(true);

    axios
      .post(URL, JSON.stringify({ message: textInput }), { headers })
      .then((response) => {
        console.log(response.data);

        setLoading(false);
        setCurrentAudio(response.data.id + ".mp3");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    async function importFile() {
      if (currentAudio) {
        await import(`../audios/${currentAudio}`)
          .then((audioFile) => {
            console.log(audioFile);
          })
          .catch((err) => {
            return;
          });
      }
    }
    importFile();
  }, [currentAudio]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log(response);
        setRecordedAudios(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setRecordedAudios]);

  return (
    <form id="input-form" onSubmit={(e) => handleSubmit(e)}>
      <UserInput textInput={textInput} setTextInput={setTextInput} />
      <Button />
    </form>
  );
};

export default Form;
