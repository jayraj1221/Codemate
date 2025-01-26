// src/components/FilesView.js
import React from "react";
import CreateFile from "../../../filesystem/CreateFile";
import FileList from "../../../filesystem/FileList";

const FilesView = () => {
  return (
    <div>
      <h1>Collaborative File System</h1>
      <CreateFile />
      <FileList />
    </div>
  );
};

export default FilesView;
