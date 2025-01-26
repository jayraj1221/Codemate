// src/filesystem/FileList.js
import React from "react";
import { useFileSystem } from "../context/FileContext";

const FileList = () => {
  const { files } = useFileSystem();

  return (
    <div>
      <h2>Files:</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
