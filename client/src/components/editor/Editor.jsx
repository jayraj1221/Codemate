import { useAppContext } from "../../context/AppContext";
import { useSocket } from "../../context/SocketContext";
import CodeMirror, { scrollPastEnd } from "@uiw/react-codemirror";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { SocketEvent } from "../../types/socket";

function Editor() {
    const { users, currentUser } = useAppContext();
    const { socket } = useSocket();
    const [activeFile, setActiveFile] = useState({
        id: "test-file",
        name: "Test File",
        content: "// Start coding here...",
    });
    const [timeOut, setTimeOut] = useState(setTimeout(() => {}, 0));
    const filteredUsers = useMemo(
        () => users.filter((u) => u.username !== currentUser.username),
        [users, currentUser]
    );
    const [extensions, setExtensions] = useState([scrollPastEnd()]);

    const onCodeChange = (code, view) => {
        if (!activeFile) return;

        // Update activeFile content
        const file = { ...activeFile, content: code };
        setActiveFile(file);

        // Emit typing and file update events
        const cursorPosition = view.state?.selection?.main?.head;
        socket.emit("TYPING_START", { cursorPosition });
        socket.emit(SocketEvent.FILE_UPDATED, {
            fileId: activeFile.id,
            newContent: code,
        });

        // Handle typing pause
        clearTimeout(timeOut);
        const newTimeOut = setTimeout(() => socket.emit("TYPING_PAUSE"), 1000);
        setTimeOut(newTimeOut);
    };

    useEffect(() => {
        // Listen for FILE_UPDATED event
        const handleFileUpdate = (data) => {
            if (data.fileId === activeFile.id) {
                setActiveFile((prevFile) => ({
                    ...prevFile,
                    content: data.newContent,
                }));
            }
        };

        socket.on(SocketEvent.FILE_UPDATED, handleFileUpdate);

        // Cleanup the listener on unmount
        return () => {
            socket.off(SocketEvent.FILE_UPDATED, handleFileUpdate);
        };
    }, [socket, activeFile.id]);

    // Mock effect to initialize extensions
    useEffect(() => {
        // Additional extensions can be added here
        setExtensions([scrollPastEnd()]);
    }, []);

    return (
        <CodeMirror
            onChange={onCodeChange}
            value={activeFile?.content || "// Start coding here..."}
            extensions={extensions || []}
            minHeight="100%"
            maxWidth="100vw"
            style={{
                height: "100vh",
                position: "relative",
            }}
        />
    );
}

export default Editor;
