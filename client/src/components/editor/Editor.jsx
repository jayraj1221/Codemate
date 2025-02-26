import { useAppContext } from "../../context/AppContext";
import { useSocket } from "../../context/SocketContext";
import CodeMirror, { scrollPastEnd } from "@uiw/react-codemirror";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SocketEvent } from "../../types/socket";
import { useFileSystem } from "../../context/FileContext";

function Editor() {
    const { users, currentUser } = useAppContext();
    const { activeFile, setActiveFile , setOpenFiles , setFiles , files , openFiles} = useFileSystem();
    const { socket } = useSocket();
    const [timeoutId, setTimeoutId] = useState(null);
    const filteredUsers = useMemo(
        () => users.filter((u) => u.username !== currentUser.username),
        [users, currentUser]
    );
    const [extensions, setExtensions] = useState([scrollPastEnd()]);

    // Handle code change
    const onCodeChange = useCallback(
        (code, view) => {
            if (!activeFile) return;
            const file = {...activeFile , content: code}
            setActiveFile(file)
            let newFiles = [...files]
            let index = newFiles.findIndex((file) => file.id === activeFile.id)
            newFiles[index] = file
            setFiles(newFiles)
            newFiles = [...openFiles]
            index = newFiles.findIndex((file) => file.id === activeFile.id)
            newFiles[index] = file
            setOpenFiles(newFiles)
            const cursorPosition = view.state?.selection?.main?.head;
            socket.emit("TYPING_START", { cursorPosition });
            socket.emit(SocketEvent.FILE_UPDATED, {
                fileId: activeFile.id,
                newContent: code,
            });

            // Clear and set a new timeout for "typing pause"
            if (timeoutId) clearTimeout(timeoutId);
            const newTimeout = setTimeout(() => {
                socket.emit("TYPING_PAUSE");
            }, 1000);
            setTimeoutId(newTimeout);
        },
        [activeFile, socket, timeoutId]
    );

    // Listen for FILE_UPDATED event
    // useEffect(() => {
    //     if (!activeFile || !socket) return;

    //     const handleFileUpdate = (data) => {
    //         if (data.fileId === activeFile.id) {
    //             setActiveFile((prevFile) => ({
    //                 ...prevFile,
    //                 content: data.newContent,
    //             }));
    //         }
    //     };

    //     x.on(SocketEvent.FILE_UPDATED, handleFileUpdate);
    //     return () => {
    //         socket.off(SocketEvent.FILE_UPDATED, handleFileUpdate);
    //     };
    // }, [socket, activeFile]);

    // Initialize extensions
    useEffect(() => {
        setExtensions([scrollPastEnd()]);
    }, []);

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
                }}
            />
        </div>
    );
}

export default Editor;
