import { useAppContext } from "../../context/AppContext";
import { useSocket } from "../../context/SocketContext";
import CodeMirror, { scrollPastEnd } from "@uiw/react-codemirror";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SocketEvent } from "../../types/socket";
import { useFileSystem } from "../../context/FileContext";
import { oneDark } from "@uiw/react-codemirror";
import { autocompletion } from "@codemirror/autocomplete";

// Language imports
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";

function Editor() {
    const { users, currentUser } = useAppContext();
    const { activeFile, setActiveFile, setOpenFiles, setFiles, files, openFiles } = useFileSystem();
    const { socket } = useSocket();
    const [timeoutId, setTimeoutId] = useState(null);
    
    const filteredUsers = useMemo(() => users.filter((u) => u.username !== currentUser.username), [users, currentUser]);

    // Define language extensions
    const languageExtensions = {
        js: javascript(),
        javascript: javascript(),
        py: python(),
        python: python(),
        java: java(),
        c: cpp(),
        cpp: cpp(),
    };

    // Determine file type and set language extension
    const getFileExtension = () => {
        if (!activeFile || !activeFile.name) return "javascript"; // Default to JS
        const ext = activeFile.name.split(".").pop().toLowerCase();
        return languageExtensions[ext] || javascript();
    };

    // Handle code change
    const onCodeChange = useCallback(
        (code, view) => {
            if (!activeFile) return;

            // Update active file
            const updatedFile = { ...activeFile, content: code };
            setActiveFile(updatedFile);

            // Update file lists
            const updateFiles = (fileList) =>
                fileList.map((file) => (file.id === activeFile.id ? updatedFile : file));
            setFiles(updateFiles(files));
            setOpenFiles(updateFiles(openFiles));

            // Get cursor position
            const cursorPosition = view.state?.selection?.main?.head;
            socket.emit("TYPING_START", { cursorPosition });

            // Emit file update event
            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent: code,
            });

            // Clear and reset typing pause timeout
            if (timeoutId) clearTimeout(timeoutId);
            setTimeoutId(setTimeout(() => socket.emit("TYPING_PAUSE"), 1000));
        },
        [activeFile, socket, timeoutId, setActiveFile, setFiles, setOpenFiles, files, openFiles]
    );

    // Initialize extensions based on file type
    const extensions = useMemo(() => [scrollPastEnd(), autocompletion(), getFileExtension()], [activeFile]);

    return (
        <div className="flex w-full flex-col overflow-x-auto md:h-screen">
           <CodeMirror
    onChange={onCodeChange}
    value={activeFile?.content || ""}
    extensions={extensions}
    minHeight="100%"
    maxWidth="100vw"
    style={{
        height: "100vh",
        position: "relative",
        fontSize: "18px", // Increase font size
        fontFamily: "monospace", // Ensure a clean code font
        lineHeight: "1.5", // Improve readability
    }}
    theme={oneDark}
/>

        </div>
    );
}

export default Editor;
