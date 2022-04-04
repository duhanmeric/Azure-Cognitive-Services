import React, { useState } from "react";
import { useLoading } from "../LoadingContext";
import axios from "axios";
import Button from "./Button";
import UserInput from "./UserInput";

const Form = () => {
  const [textInput, setTextInput] = useState("");

  const { setLoading, setRecordedAudios, setCurrentAudio } = useLoading();

  const URL = "https://bulut-final.herokuapp.com/audio";
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
        setLoading(false);
        setCurrentAudio(response.data);
        setRecordedAudios((p: any) => [
          ...p,
          {
            id: (Math.random() * 100000).toString(),
            file: `https://bulut-final.herokuapp.com${response.data}`,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form id="input-form" onSubmit={(e) => handleSubmit(e)}>
      <UserInput textInput={textInput} setTextInput={setTextInput} />
      <Button />
    </form>
  );
};

export default Form;
