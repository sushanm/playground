import logo from "./logo.svg";
import "./App.css";
import Folder from "./components/Folder";
import { useEffect, useState } from "react";
import { fileStruct } from "./data/file";
import useTraverse from "./hooks/useTraverse";

function App() {
  const [explorerData, setExplorerData] = useState(fileStruct);
  const { addNode } = useTraverse();

  useEffect(() => {
    console.log(explorerData);
  }, [explorerData]);

  const handleNew = (id, name, isFolder) => {
    setExplorerData(addNode(explorerData, id, name, isFolder));
  };

  return (
    <div className="App">
      <Folder explorer={explorerData} handleNew={handleNew} />
    </div>
  );
}

export default App;
