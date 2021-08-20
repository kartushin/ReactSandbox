import React from "react";
import "./errorMessage.css";
import img from "./error.jpg";

const ErrorMessage = () => {
  return (
    <div>
      <img src={img} alt="error"></img>
      <span>Что-то здесь не так</span>
    </div>
  );
};

export default ErrorMessage;
