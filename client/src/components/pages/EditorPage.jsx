import SplitterComponent from "../splitter/SplitterComponent";
import WorkSpace from "../workspace/WorkSpace"
import Sidebar from "../sidebar/Sidebar";
import { useAppContext } from "../../context/AppContext";
import { useSocket } from "../../context/SocketContext";
import { SocketEvent } from "../../types/socket";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
function EditorPage() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { status, setCurrentUser, currentUser } = useAppContext();
    const { socket } = useSocket();
    const location = useLocation();

    useEffect(() => {
        if (currentUser.username && currentUser.username.length > 0) return;

        const username = location.state?.username;
        if (!username) {
            navigate("/homepage", {
                state: { roomId },
            });
        } else if (roomId) {
            const user = { username, roomId };
            setCurrentUser(user);
            socket.emit(SocketEvent.JOIN_REQUEST, user);
        }
    }, [
        currentUser.username,
        location.state?.username,
        navigate,
        roomId,
        setCurrentUser,
        socket,
    ]);


    return (
                <SplitterComponent>
                    <Sidebar />
                    <WorkSpace />
                </SplitterComponent>
    );
}

export default EditorPage;
