import Avatar from 'react-avatar';
import { useAppContext } from '../../context/AppContext';
import { USER_CONNECTION_STATUS } from '../../types/user';

const User = ({ user }) => {
    const { username, status } = user;
    const title = `${username} - ${status === USER_CONNECTION_STATUS.ONLINE ? "online" : "offline"}`;
    const firstLetter = username.charAt(0).toUpperCase();

    return (
        <div
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            title={title}
        >
            <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white font-bold text-xl">
                    {firstLetter}
                </div>
                <div
                    className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${
                        status === USER_CONNECTION_STATUS.ONLINE
                            ? "bg-green-500"
                            : "bg-red-500"
                    } border border-white`}
                ></div>
            </div>
            <p className="text-gray-800 font-medium">{username}</p>
        </div>
    );
};

const Users = () => {
    const { users } = useAppContext();

    return (
        <div className="flex flex-col gap-4">
            {users.map((u) => (
                <User key={u.socketId} user={u} />
            ))}
        </div>
    );
};

export default Users;
