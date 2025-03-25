import React, { useState, useEffect } from "react";

function Folder({ explorer, handleNew }) {
  const [expand, setExpand] = useState(false);
  const [input, setInput] = useState({
    isVisible: false,
    name: null,
    isFolder: null,
    id: null,
  });
  const handleInput = (e) => {
    if (e.keyCode == 13) {
      setInput({
        ...input,
        name: e.target.value,
        isVisible: false,
        id: explorer.id,
      });
      setExpand(true);
      handleNew(explorer.id, e.target.value, input.isFolder);
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="folder-container">
        <div
          style={{
            display: "flex",
            padding: "5px",
            backgroundColor: "#f1f1f1",
          }}
        >
          <div
            style={{ paddingRight: "10px" }}
            onClick={() => setExpand(!expand)}
          >
            📁 {explorer.name}
          </div>
          <div>
            <span
              onClick={() =>
                setInput({ ...input, isVisible: true, isFolder: true })
              }
            >
              📁 +{" "}
            </span>
            <span
              onClick={() =>
                setInput({ ...input, isVisible: true, isFolder: false })
              }
            >
              🗃️ +{" "}
            </span>
          </div>
        </div>
        {input.isVisible && (
          <div>
            {input.isFolder ? <>📁</> : <>🗃️</>}
            <input
              type="text"
              onBlur={() => setInput({ ...input, isVisible: false })}
              onKeyDown={handleInput}
              autoFocus
            ></input>
          </div>
        )}
        <div style={{ display: expand ? "block" : "none" }}>
          {explorer.items.map((item) => {
            return <Folder explorer={item} handleNew={handleNew} />;
          })}
        </div>
      </div>
    );
  } else {
    return <div className="folder-container">🗃️ {explorer.name}</div>;
  }
}

export default Folder;
