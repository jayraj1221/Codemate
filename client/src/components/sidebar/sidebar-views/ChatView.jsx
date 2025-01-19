import ListChats from '../../chats/ListChats';
import ChatIP from '../../chats/ChatIP';

const ChatView = () => 
{
    return (
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg h-screen max-w-md mx-auto">
            
            <h1 className="text-lg font-bold text-gray-800 mb-4">Chats</h1>
            
            <ListChats />
           
            <ChatIP />
        </div>
    )
}
export default ChatView