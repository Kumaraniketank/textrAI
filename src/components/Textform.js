import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Textform(props) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const handleUpClick = () => {
    console.log("converted into Uppercase");
    let n = text.toUpperCase();
    setText(n);
  };
  const handleLoClick = () => {
    console.log("converted into Lowercase");
    let n = text.toLowerCase();
    setText(n);
  };
  const handleReClick = () => {
    console.log("Removed");
    let n = text.replace(text, " ");
    setText(n);
  };
  const handleSpClick = () => {
    var utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
  const handleGcClick = async () => {
    const genAi = new GoogleGenerativeAI(apiKey);
    const model = genAi.getGenerativeModel({
      model: "gemini-pro",
    });
    const r = await model.generateContent(text);
    document.getElementById("prediction").innerText = `${r.response.text()}`;
  };
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };
  const handleCopy = () => {
    var text = document.getElementById("textbox");
    text.select();
    navigator.clipboard.writeText(text.value);
  };
  // const handleGenCopy = () => {
  //   var gencont = document.getElementById("prediction");
  //   gencont.select();
  //   navigator.clipboard.writeText(gencont.value);
  // };
  const handleOnChange = (event) => {
    console.log("converted");
    setText(event.target.value);
  };
  const [text, setText] = useState("");

  return (
    <>
      <div
        className="container"
        // style={{
        //   color: props.mode === "dark" ? "white" : "black",
        // }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            // style={{
            //   backgroundColor: "props.mode === 'dark' ? 'black' : 'white'",
            //   color: props.mode === "dark" ? "white" : "black",
            // }}
            placeholder="कुछ वाक्य लिखें✍️ 👇"
            id="textbox"
            rows="8"
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          type="button"
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
        >
          Convert to Lowercase
        </button>
        <button
          type="button"
          className="btn btn-danger mx-1 my-1"
          onClick={handleReClick}
        >
          Clear
        </button>
        <button
          type="button"
          className="btn btn-success mx-1 my-1"
          onClick={handleSpClick}
        >
          Speak
        </button>
        <button
          type="button"
          className="btn btn-success mx-1 my-1"
          onClick={handleGcClick}
        >
          GenContent
        </button>
        <button
          type="button"
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Extra Spaces
        </button>
        <button
          type="button"
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}
        >
          Copy Text
        </button>
        {/* <button
          type="button"
          className="btn btn-success mx-1 my-1"
          onClick={handleGenCopy}
        >
          Copy GenContent
        </button> */}
      </div>
      <div
        className="container my-3"
        // style={{
        //   color: props.mode === "dark" ? "white" : "black",
        // }}
      >
        <h2>Text Summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words
        </p>
        <p>
          {0.008 *
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          minutes to read
        </p>
        <h2>Preview</h2>
        <p>
          {text.length > 0 ? text : "Write something above to preview it here"}
        </p>
        <h2>AI Generated Content</h2>
        <p>
          <span id="prediction"></span>
        </p>
      </div>
    </>
  );
}
