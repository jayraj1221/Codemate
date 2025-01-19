import { useAppContext } from "../../context/AppContext";
import { useChatRoom } from "../../context/ChatContext";
import { useRef, useEffect } from "react";

function ListChats()
{
    const { msgs,
		isNewMsg,
		setIsNewMsg,
		scrollHgt,
		setScrollHgt,} = useChatRoom();

    const { currentUser } = useAppContext();
    const msgsBoxRef = useRef(null);

    const handlScroll = (ev) => {
        const box = ev.target;
        setScrollHgt(box.scrollTop);
    }

	// Scroll to bottom when new message arrives
    useEffect(() => {
       if(!msgsBoxRef.current)
	   {
		return;
	   }
	   msgsBoxRef.current.scrollTop = msgsBoxRef.current.scrollHeight;
    }, [msgs]);

	useEffect(() => {
		if(isNewMsg)
		{
			setIsNewMsg(false);
		}
		if(msgsBoxRef.current)
		{
			msgsBoxRef.current.scrollTop = scrollHgt;
		}
	}, [isNewMsg, setIsNewMsg, scrollHgt]);

	return (
        <div
            className="flex flex-col gap-2 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md h-[75%] w-full"
            ref={msgsBoxRef}
            onScroll={handlScroll}
        >
            {/* All messages */}
            {msgs.map((msg, idx) => {
                const isCurrentUser = msg.username === currentUser.username;
                return (
                    <div
                        key={idx}
                        className={`flex ${
                            isCurrentUser ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-xs break-words rounded-lg p-3 text-sm shadow-md ${
                                isCurrentUser
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-900"
                            }`}
                        >
                            <div className="flex justify-between mb-1">
                                <span className="font-semibold">{msg.username}</span>
                                <span className="text-xs ml-4">{msg.time}</span>
                            </div>
                            <p>{msg.message}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ListChats;