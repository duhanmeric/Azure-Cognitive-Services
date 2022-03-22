import React, { useState, useEffect } from "react";
import { useLoading } from "../LoadingContext";
import axios from "axios";
import Button from "./Button";
import UserInput from "./UserInput";

const Form = () => {
  const [textInput, setTextInput] = useState("");
  const { loading, setLoading, recordedVoices, setRecordedVoices } =
    useLoading();
  const URL = "http://localhost:8000/audio";
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
        setRecordedVoices([...recordedVoices, response.data as never]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(loading, recordedVoices);
  }, [loading, recordedVoices]);

  return (
    <form id="input-form" onSubmit={(e) => handleSubmit(e)}>
      <UserInput textInput={textInput} setTextInput={setTextInput} />
      <Button />
    </form>
  );
};

export default Form;
