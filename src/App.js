import "./App.css";
// import About from "./components/About";

import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <>
      <Navbar title="TEXTRA-AI" mode={mode} toggleMode={toggleMode} />

      <div className="container">
        {<Textform heading=" Write the text to convert below" />}
      </div>
    </>
  );
}

export default App;
