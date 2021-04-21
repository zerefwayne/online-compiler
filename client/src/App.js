import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    console.log("Submitting code", code);
    try {
      const response = await axios.post("http://localhost:3000/run", { code });
      console.log(response.data);
    } catch (err) {
      err.response && console.error(err.response.data);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Online Code Compiler</h1>
        <textarea
          rows="20"
          cols="75"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        ></textarea>
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default App;
