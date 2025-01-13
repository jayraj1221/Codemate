import SplitterComponent from "../SplitterComponent";
// import ConnectionStatusPage from "@/components/connection/ConnectionStatusPage";
import WorkSpace from "../workspace/WorkSpace"
import Sidebar from "../sidebar/Sidebar";
import { useAppContext } from "../../context/AppContext";
import { useSocket } from "../../context/SocketContext";
// import useFullScreen from "@/hooks/useFullScreen";
// import useUserActivity from "@/hooks/useUserActivity";
import { SocketEvent } from "../../types/socket";
// import { USER_STATUS } from "@/types/user";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
function EditorPage() {
    // Listen for user online/offline status
    // useUserActivity();
    // Enable fullscreen mode
    // useFullScreen();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { status, setCurrentUser, currentUser } = useAppContext();
    const { socket } = useSocket();
    const location = useLocation();

    useEffect(() => {
        if (currentUser.username && currentUser.username.length > 0) return;

        const username = location.state?.username;
        if (!username) {
            navigate("/", {
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

    // if (status === USER_STATUS.CONNECTION_FAILED) {
    //     return <ConnectionStatusPage />;
    // }

    return (
                <SplitterComponent>
                    <Sidebar />
                    <WorkSpace />
                </SplitterComponent>
    );
}

export default EditorPage;
