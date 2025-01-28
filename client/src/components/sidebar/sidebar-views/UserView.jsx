import { useAppContext } from "../../../context/AppContext";
import { useSocket } from "../../../context/SocketContext";
import { USER_STATUS } from "../../../types/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { CiShare1 } from "react-icons/ci";
import { PiSignOutFill } from "react-icons/pi";
import Users from "../../common/Users";

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
    <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg h-screen max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mt-6 mb-4 text-center">
        Connected Users
      </h1>

      {/* Scrollable Users Container */}
      <div className="flex-1 w-full max-w-lg md:max-w-xl overflow-y-auto">
        <Users />
      </div>

      {/* Fixed Buttons at Bottom */}
      <div className="flex gap-4 p-4 justify-center w-full bg-gray-100 md:justify-center">
        <button
          onClick={leave}
          title="Leave room"
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md md:w-12 md:h-12 md:flex md:items-center md:justify-center"
        >
          <PiSignOutFill className="w-6 h-6" />
        </button>
        <button
          onClick={share}
          title="Share URL"
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md md:w-12 md:h-12 md:flex md:items-center md:justify-center"
        >
          <CiShare1 className="w-6 h-6" />
        </button>
        <button
          onClick={copy}
          title="Copy URL"
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md md:w-12 md:h-12 md:flex md:items-center md:justify-center"
        >
          <IoCopyOutline className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default UserView;