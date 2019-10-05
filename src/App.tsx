import React from "react";
import "./App.scss";
import Dog from "./dog.svg";

function App() {
  return (
    <>
      <h1>Fetch me a Dog!</h1>
      <img src={Dog} alt="Dog logo" className="dog-logo" />
      <button className="btn">Fetch!</button>
      <img
        src="https://via.placeholder.com/600x400"
        alt="A cute dog"
        className="dog-image"
      />
    </>
  );
}

export default App;
