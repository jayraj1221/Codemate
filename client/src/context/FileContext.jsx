import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { SocketEvent } from "../types/socket";

const FileSystemContext = createContext();

export const FileSystemProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const { socket } = useSocket();


  const handleFileCreated = (newFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]);
    setOpenFiles((prevOpenFiles) => [...prevOpenFiles, newFile]);
    setActiveFile(newFile); // Immediately set the new file as active
  };

  // Create new file locally & emit to socket
  const createFile = (fileName) => {
    if (!fileName.trim()) return;

    const newFile = {
      id: Date.now().toString(),
      name: fileName,
      content: "to start coding",
    };

    setFiles((prevFiles) => [...prevFiles, newFile]);
    setOpenFiles((prevOpenFiles) => [...prevOpenFiles, newFile]);
    setActiveFile(newFile); // Immediately set the new file as active

    if (socket) {
      socket.emit(SocketEvent.FILE_CREATED, newFile);
    }
  };

  // Update file content locally
  const updateFileContent = useCallback(
    (fileId, newContent) => {
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId ? { ...file, content: newContent } : file
        )
      );

      setOpenFiles((prevOpenFiles) =>
        prevOpenFiles.map((file) =>
          file.id === fileId ? { ...file, content: newContent } : file
        )
      );

      // Only update active file content if it's the same file
      setActiveFile((prevActive) =>
        prevActive?.id === fileId ? { ...prevActive, content: newContent } : prevActive
      );
    },
    []
  );

  // Handle file update from socket (Fix applied)
  const handleFileUpdate = useCallback(
    (data) => {
      const { fileId, newContent } = data;

      // Update the content for all users, but don't change their active file
      updateFileContent(fileId, newContent);

      // Only update activeFile **if it's the same file currently active**
      setActiveFile((prevActive) =>
        prevActive?.id === fileId ? { ...prevActive, content: newContent } : prevActive
      );
    },
    [updateFileContent]
  );

  // Listen for file update events from socket
  const renameFile = useCallback(
    (fileId, newName, sendToSocket = true) => {
      // Update files array
      console.log(newName)
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === fileId ? { ...file, name: newName } : file
        )
      );

      // Update open files
      setOpenFiles((prevOpenFiles) =>
        prevOpenFiles.map((file) =>
          file.id === fileId ? { ...file, name: newName } : file
        )
      );

      // Update active file if it's the renamed file
      setActiveFile((prevActive) =>
        prevActive?.id === fileId ? { ...prevActive, name: newName } : prevActive
      );

      if (!sendToSocket) return true;
      socket.emit(SocketEvent.FILE_RENAMED, {
        fileId,
        newName,
      });

      return true;
    },
    [socket]
  );
  const deleteFile = useCallback(
    (fileId, sendToSocket = true) => {
      // Remove the file from files array
      setFiles(prevFiles => 
        prevFiles.filter(file => file.id !== fileId)
      );

      // Remove the file from openFiles
      if (openFiles.some(file => file.id === fileId)) {
        setOpenFiles(prevOpenFiles =>
          prevOpenFiles.filter(file => file.id !== fileId)
        );
      }

      // Set the active file to null if it's the file being deleted
      if (activeFile?.id === fileId) {
        setActiveFile(null);
      }

      if (!sendToSocket) return;
      socket.emit(SocketEvent.FILE_DELETED, { fileId });
    },
    [activeFile?.id, openFiles, socket]
  );
  const handleFileRenamed = useCallback(
    (data) => {
      const { fileId, newName } = data;
      renameFile(fileId, newName, false);
    },
    [renameFile]
  );
  const handleFileDeleted = useCallback(
    (data) => {
      const { fileId } = data;
      deleteFile(fileId, false);
    },
    [deleteFile]
  );
  useEffect(() => {
    if (!socket) return;
    socket.on(SocketEvent.FILE_CREATED,handleFileCreated);
    socket.on(SocketEvent.FILE_UPDATED, handleFileUpdate);
    socket.on(SocketEvent.FILE_RENAMED,handleFileRenamed);
    socket.on(SocketEvent.FILE_DELETED,handleFileDeleted);
    return () => {
      socket.off(SocketEvent.FILE_CREATED , handleFileCreated);
      socket.off(SocketEvent.FILE_UPDATED, handleFileUpdate);
      socket.off(SocketEvent.FILE_RENAMED , handleFileRenamed);
      socket.off(SocketEvent.FILE_DELETED , handleFileDeleted);
    };
  }, [socket, handleFileUpdate]);

  return (
    <FileSystemContext.Provider
      value={{
        files,
        createFile,
        openFiles,
        activeFile,
        setActiveFile,
        setOpenFiles,
        setFiles,
        updateFileContent,
        renameFile,
        deleteFile,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);
