import React from "react";
import "./App.scss";
import Dog from "./dog.svg";

function App() {
  return (
    <>
      <h1>Fetch me a Dog!</h1>
      <img src={Dog} alt="Dog logo" className="dog-logo" />
    </>
  );
}

export default App;
