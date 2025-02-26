import React, { useState, useEffect } from "react";
import { useFileSystem } from "../context/FileContext";

const FileList = () => {
  const { files, setActiveFile, setOpenFiles, renameFile, deleteFile } = useFileSystem();
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, fileId: null });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State for delete modal visibility
  const [fileToDelete, setFileToDelete] = useState(null); // File to delete

  const handleContextMenu = (e, fileId) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
      fileId,
    });
  };

  const handleRename = (fileId) => {
    const newName = prompt("Enter new file name:");
    if (newName) {
      renameFile(fileId, newName);
    }
    setContextMenu({ visible: false, x: 0, y: 0, fileId: null });
  };

  const handleDeleteClick = (fileId) => {
    setFileToDelete(fileId); // Store the file ID to be deleted
    setDeleteModalVisible(true); // Show the delete confirmation modal
    setContextMenu({ visible: false, x: 0, y: 0, fileId: null });
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      deleteFile(fileToDelete);
      setFileToDelete(null); // Clear the file to delete
      setDeleteModalVisible(false); // Hide the delete confirmation modal
    }
  };

  const cancelDelete = () => {
    setFileToDelete(null); // Clear the file to delete
    setDeleteModalVisible(false); // Hide the delete confirmation modal
  };

  // Close context menu when clicking outside
  useEffect(() => {
    const closeMenu = () => setContextMenu({ visible: false, x: 0, y: 0, fileId: null });
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Files</h2>
      <ul className="space-y-3">
        {files.map((file) => (
          <li
            key={file.id}
            onClick={() => {
              setActiveFile(file);
              setOpenFiles((prevFiles) => {
                const fileExists = prevFiles.some((openFile) => openFile.id === file.id);
                return fileExists ? prevFiles : [...prevFiles, file];
              });
            }}
            onContextMenu={(e) => handleContextMenu(e, file.id)}
            className="p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out"
          >
            <span className="text-gray-700 text-lg font-medium">{file.name}</span>
          </li>
        ))}
      </ul>

      {contextMenu.visible && (
        <div
          className="fixed bg-white shadow-lg rounded-md py-2 min-w-[150px] z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => handleRename(contextMenu.fileId)}
          >
            Rename
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
            onClick={() => handleDeleteClick(contextMenu.fileId)} // Trigger modal
          >
            Delete
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this file?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileList;
