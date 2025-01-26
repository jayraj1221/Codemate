// src/context/FileSystemContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";

const FileSystemContext = createContext();

export const FileSystemProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("fileCreated", (newFile) => {
        setFiles((prevFiles) => [...prevFiles, newFile]);
      });
    }
    return () => {
      if (socket) socket.off("fileCreated");
    };
  }, [socket]);

  const createFile = (fileName) => {
    if (!fileName.trim()) return;

    const newFile = {
      id: Date.now().toString(),
      name: fileName,
      content: "",
    };

    setFiles((prevFiles) => [...prevFiles, newFile]); // Update local state
    if (socket) {
      socket.emit("fileCreated", newFile); // Notify other users
    }
  };

  return (
    <FileSystemContext.Provider value={{ files, createFile }}>
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);
