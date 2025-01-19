import { useAppContext } from "../../context/AppContext";
import { useSocket } from "../../context/SocketContext";
import { SocketEvent } from "../../types/socket";
import { useChatRoom } from "../../context/ChatContext";
import { useRef } from "react";
import { VscSend } from "react-icons/vsc";
import { v4 as uid } from "uuid";
import getDate  from "../../utils/dateFormater";

function ChatIP()
{
    const { currentUser } = useAppContext();
    
    const { socket } = useSocket();
    
    const {setMsgs} = useChatRoom();

    const ipRef = useRef(null);

    const sendMessage = (ev) => {
        ev.preventDefault();

        const val = ipRef.current?.value.trim();

        if(val && val.length > 0)
        {
            const msg = {
                id: uid(),
                message: val,
                username: currentUser.username,
                time: getDate(new Date().toISOString()),
            };
            console.log(msg);
            socket.emit(SocketEvent.SEND_MESSAGE, { msg });
            
            setMsgs((msgs) => [...msgs, msg]);

            if(ipRef.current)
            {
                ipRef.current.value = "";
            }
        }
    };

    return (
        <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow-md w-full"
        >
            <input
                type="text"
                className="flex-grow border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type a Message here..."
                ref={ipRef}
            />
            <button
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                type="submit"
            >
                <VscSend size={25} />
            </button>
        </form>
    );
}

export default ChatIP;