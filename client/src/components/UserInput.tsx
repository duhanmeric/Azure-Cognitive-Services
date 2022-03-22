import React, { FC } from "react";

type UserInputProps = {
  textInput: string;
  setTextInput: React.Dispatch<React.SetStateAction<string>>;
};

const UserInput: FC<UserInputProps> = (props) => {
  return (
    <div className="form-floating">
      <textarea
        onChange={(e) => props.setTextInput(e.target.value)}
        className="user-textarea form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea2"
        style={{ height: "300px", resize: "none" }}
      ></textarea>
      <label htmlFor="floatingTextarea2">Enter your text here...</label>
    </div>
  );
};

export default UserInput;
