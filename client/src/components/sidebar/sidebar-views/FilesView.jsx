import React from "react";
import { FaFolderOpen, FaDownload } from "react-icons/fa";
import CreateFile from "../../../filesystem/CreateFile";
import FileList from "../../../filesystem/FileList";

const FilesView = () => {
  return (
    <div className="w-full h-full bg-white text-gray-900 shadow-md border border-gray-300 rounded-2xl flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300 rounded-t-2xl">
        <h2 className="text-lg font-semibold">Files</h2>
        <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
          <CreateFile />
        </button>
      </div>

      {/* File List - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        <FileList />
      </div>

      {/* Footer Options */}
      <div className="border-t border-gray-300 p-4 flex flex-col space-y-2 rounded-b-2xl">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <FaFolderOpen />
          <span>Open File</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <FaDownload />
          <span>Download Code</span>
        </button>
      </div>
    </div>
  );
};

export default FilesView;
