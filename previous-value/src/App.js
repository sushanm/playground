import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const previousValue = useRef("");

  useEffect(() => {
    previousValue.current = name;
  }, [name]);

  return (
    <div className="App">
      Name :{" "}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      Previous Value: {previousValue.current}
    </div>
  );
}

export default App;
