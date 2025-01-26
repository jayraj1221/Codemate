// src/filesystem/CreateFile.js
import React, { useState } from "react";
import { useFileSystem } from "../context/FileContext";

const CreateFile = () => {
  const [fileName, setFileName] = useState("");
  const { createFile } = useFileSystem();

  const handleCreateFile = () => {
    createFile(fileName);
    setFileName(""); // Clear input field
  };

  return (
    <div>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter file name"
      />
      <button onClick={handleCreateFile}>Create File</button>
    </div>
  );
};

export default CreateFile;
