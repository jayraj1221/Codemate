import React, { useState , useRef } from "react";
import { useFileSystem } from "../context/FileContext";

const CreateFile = () => {
  const [fileName, setFileName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createFile } = useFileSystem();
  const inputRef = useRef(null);
  
  // Open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Use setTimeout to ensure the input is mounted before focusing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle file creation and close the modal
  const handleCreateFile = () => {
    createFile(fileName);
    setFileName(""); // Clear input field
    setIsModalOpen(false); // Close the modal
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreateFile();
    }
  };

  return (
    <div>
      {/* Button to trigger the modal */}
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create File
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Create New File</h2>
            <input
              ref={inputRef}
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter file name"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFile;
