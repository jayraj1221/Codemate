"use client";

import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPlus, FaGripVertical, FaChevronLeft, FaChevronRight, FaFileCode, FaFile, FaFileAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const getFileIcon = (type) => {
  switch (type) {
    case "tsx":
    case "ts":
      return <FaFileCode className="w-4 h-4" />;
    case "css":
      return <FaFile className="w-4 h-4" />;
    case "json":
    case "d.ts":
      return <FaFileAlt className="w-4 h-4" />;
    default:
      return <FaFile className="w-4 h-4" />;
  }
};

export default function FilesTab() {
  const [files, setFiles] = useState([
    { id: "1", title: "index.js", type: "tsx" },
  ]);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [activeFileId, setActiveFileId] = useState("1");
  const scrollContainerRef = useRef(null);
  const [draggedFileId, setDraggedFileId] = useState(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowScrollButtons(scrollWidth > clientWidth);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const closeFile = (fileId, event) => {
    event?.stopPropagation();
    const newFiles = files.filter((file) => file.id !== fileId);
    setFiles(newFiles);
    if (activeFileId === fileId && newFiles.length > 0) {
      setActiveFileId(newFiles[0].id);
    }
  };

  const handleDragStart = (e, fileId) => {
    setDraggedFileId(fileId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetFileId) => {
    e.preventDefault();
    if (!draggedFileId) return;

    const draggedIndex = files.findIndex((file) => file.id === draggedFileId);
    const targetIndex = files.findIndex((file) => file.id === targetFileId);

    if (draggedIndex === targetIndex) return;

    const newFiles = [...files];
    const [draggedFile] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(targetIndex, 0, draggedFile);

    setFiles(newFiles);
  };

  const addNewFile = () => {
    const newFile = {
      id: `${files.length + 1}`,
      title: `newfile${files.length + 1}.ts`,
      type: "ts",
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFile.id);
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="relative flex items-center">
        {showScrollButtons && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 z-10 h-full px-1 bg-gradient-to-r from-gray-900 to-transparent"
          >
            <FaChevronLeft className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar"  // Add no-scrollbar class here to hide scrollbar
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex space-x-1 p-2 min-w-max">
            <AnimatePresence initial={false}>
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, file.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, file.id)}
                  onClick={() => setActiveFileId(file.id)}
                  className={`group flex items-center px-3 py-2 cursor-pointer select-none transition-all duration-200 ease-in-out rounded-t-lg border-t border-l border-r border-transparent hover:border-gray-700 hover:bg-gray-800 ${
                    activeFileId === file.id
                      ? "bg-gray-800 text-white border-gray-700 border-b-transparent"
                      : "text-gray-400"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {getFileIcon(file.type)}
                    <span className="text-sm font-medium">{file.title}</span>
                  </div>
                  <button
                    onClick={(e) => closeFile(file.id, e)}
                    className="ml-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-700"
                    title="Close file"
                  >
                    <FaTimes className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            <motion.button
              onClick={addNewFile}
              className="flex items-center px-3 py-2 text-gray-400 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {showScrollButtons && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 z-10 h-full px-1 bg-gradient-to-l from-gray-800 to-transparent"
          >
            <FaChevronRight className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
}
