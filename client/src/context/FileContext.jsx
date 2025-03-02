import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import { SocketEvent } from "../types/socket";
import { useAppContext } from "./AppContext"
import toast from "react-hot-toast";
import JSZip from "jszip";
import {saveAs} from "file-saver";

const FileSystemContext = createContext();

export const FileSystemProvider = ({ children }) => {
  const [files, setFiles] = useState([{
    id: Date.now.toString(),
    name: "index.cpp",
    content: "#include <iostream>\nint main() { std::cout << \"Hello, World!\"; return 0; }"
  }]);
  const [openFiles, setOpenFiles] = useState([{
    id: Date.now.toString(),
    name: "index.cpp",
    content: "#include <iostream>\nint main() { std::cout << \"Hello, World!\"; return 0; }"
  }]);
  const [activeFile, setActiveFile] = useState({
    id: Date.now.toString(),
    name: "index.cpp",
    content: "#include <iostream>\nint main() { std::cout << \"Hello, World!\"; return 0; }"
  });
  const { socket } = useSocket();

  const {
          setUsers
      } = useAppContext()
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

      // Set the active file to first file from open files if it's the file being deleted
      if (activeFile?.id === fileId) {
        setActiveFile(openFiles[0]);
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

  const handleUserJoined = useCallback(
    ({ user }) => {
      
      toast.success(`${user.username} joined the room`);
      
      socket.emit(SocketEvent.SYNC_FILE_STRUCTURE, {
        files,
        openFiles,
        activeFile,
        socketId: user.socketId
      });
      
      setUsers((prev) => [...prev, user]);
    },
    [activeFile, openFiles, socket, setUsers],
  );

  const handleSyncFileStructure = useCallback(
    ({files, openFiles, activeFile}) => {
      // console.log("files: "+files[0].name);
      // console.log("OpenFiles: "+ openFiles[0].name);
      // console.log("ActiveFiles: "+ activeFile.name);
      setFiles(files);
      setOpenFiles(openFiles);
      setActiveFile(activeFile);
    },
    []
  );

  const downloadFiles = () => {
    const zip = JSZip();

    // add all files
    files.forEach(file => {
      zip.file(file.name, file.content || "");
    });

    // Download zip file
    zip.generateAsync({type: "blob"}).then((content) => { saveAs(content, "files.zip") });
  }

  const openFilesFromStorage = () => {
    // Create an input element of type file
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true; // Allow multiple files to be selected
    input.accept = '.txt,.js,.cpp,.c,.py,.html,.css,.json,.ts,.java,.asm,.php,.cs,.h'; // Specify accepted file types (optional)
  
    // Trigger the file selection dialog
    input.click();
  
    // Handle file selection
    input.onchange = (e) => {
      const selectedFiles = e.target.files;
  
      // Read each file and add it to the files state
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const reader = new FileReader();
  
        reader.onload = (event) => {
          const fileContent = event.target.result;
  
          // Create a new file object
          const newFile = {
            id: Date.now().toString() + i, // Unique ID for each file
            name: file.name,
            content: fileContent,
          };
  
          // Add the new file to the files state
          setFiles((prevFiles) => [...prevFiles, newFile]);
          setOpenFiles((prevOpenFiles) => [...prevOpenFiles, newFile]);
          setActiveFile(newFile); // Set the new file as active
  
          // Emit the new file to the socket (if needed)
          if (socket) {
            socket.emit(SocketEvent.FILE_CREATED, newFile);
          }
        };
  
        // Read the file as text
        reader.readAsText(file);
      }
    };
  };

  useEffect(() => {
    if (!socket) return;
    socket.on(SocketEvent.FILE_CREATED,handleFileCreated);
    socket.on(SocketEvent.FILE_UPDATED, handleFileUpdate);
    socket.on(SocketEvent.FILE_RENAMED,handleFileRenamed);
    socket.on(SocketEvent.FILE_DELETED,handleFileDeleted);
    socket.on(SocketEvent.USER_JOINED, handleUserJoined);
    socket.on(SocketEvent.SYNC_FILE_STRUCTURE, handleSyncFileStructure);
    return () => {
      socket.off(SocketEvent.FILE_CREATED , handleFileCreated);
      socket.off(SocketEvent.FILE_UPDATED, handleFileUpdate);
      socket.off(SocketEvent.FILE_RENAMED , handleFileRenamed);
      socket.off(SocketEvent.FILE_DELETED , handleFileDeleted);
      socket.off(SocketEvent.USER_JOINED);
      socket.off(SocketEvent.SYNC_FILE_STRUCTURE);
    };
  }, [socket, handleFileUpdate, handleFileCreated, handleFileDeleted, handleFileRenamed, handleSyncFileStructure, handleUserJoined]);

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
        downloadFiles,
        openFilesFromStorage,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => useContext(FileSystemContext);
