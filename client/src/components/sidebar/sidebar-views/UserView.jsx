import { useAppContext } from "../../../context/AppContext";
import { useSocket } from '../../../context/SocketContext';
import { USER_STATUS } from "../../../types/user";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; 
import { IoCopyOutline } from "react-icons/io5";
import { CiShare1 } from "react-icons/ci";
import { PiSignOutFill } from "react-icons/pi";
import Users from '../../common/Users';

const UserView = () => {
    const { setStatus } = useAppContext();
    const { socket } = useSocket();
    const navigate = useNavigate();

    const copy = async () => {
        const url = window.location.href;

        try {
            await navigator.clipboard.writeText(url);
            toast.success("URL copied...");
        } catch (err) {
            toast.error("Could not copy URL");
            console.log(err);
        }
    };

    const share = async () => {
        const url = window.location.href;
        try {
            await navigator.share({ url });
        } catch (err) {
            toast.error("Could not share URL");
            console.log(err);
        }
    };

    const leave = () => {
        socket.disconnect();
        setStatus(USER_STATUS.DISCONNECTED);
        navigate("/", {
            replace: true,
        });
    };

    return (
        <div className="flex flex-col items-center w-full p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Connected Users</h1>
            <div className="w-full max-w-lg">
                <Users />
            </div>
            <div className="flex gap-4 mt-6">
                <button
                    onClick={leave}
                    title="Leave room"
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md"
                >
                    <PiSignOutFill className="w-6 h-6" />
                </button>
                <button
                    onClick={share}
                    title="Share URL"
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                >
                    <CiShare1 className="w-6 h-6" />
                </button>
                <button
                    onClick={copy}
                    title="Copy URL"
                    className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md"
                >
                    <IoCopyOutline className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default UserView;