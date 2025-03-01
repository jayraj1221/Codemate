import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { USER_CONNECTION_STATUS } from '../../types/user';

const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm to randomize the array order
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
};

const getColorForCharacter = (char, availableColors) => {
    // Use the ASCII value of the character to select a color from the shuffled colors
    const index = (char.toUpperCase().charCodeAt(0) - 65) % availableColors.length;
    return availableColors[index];
};

const User = ({ user, color }) => {
    const { username, status } = user;
    const title = `${username} - ${status === USER_CONNECTION_STATUS.ONLINE ? "online" : "offline"}`;
    const firstLetter = username.charAt(0);
    const { currentUser } = useAppContext();

    return (
        <div
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            title={title}
        >
            <div className="relative">
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-2xl"
                    style={{ backgroundColor: color }}
                >
                    {firstLetter}
                </div>
                <div
                    className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${status === USER_CONNECTION_STATUS.ONLINE ? "bg-green-500" : "bg-red-500"} border border-white`}
                ></div>
            </div>
            <p className="text-gray-800 font-medium">
                {currentUser.username === username ? `${username} (You)` : `${username}`}
            </p>
        </div>
    );
};

const Users = () => {
    const { users } = useAppContext();
    const [userColors, setUserColors] = useState({});

    useEffect(() => {
        // List of colors available to assign
        const colors = [
            "#FF5733", "#33FF57", "#3357FF", "#F39C12", "#8E44AD", 
            "#16A085", "#E74C3C", "#3498DB", "#9B59B6", "#2ECC71",
            "#E67E22", "#1ABC9C", "#D35400", "#2980B9", "#7D3C98",
            "#C0392B", "#BDC3C7", "#273746", "#E84393", "#00CEC9",
            "#636E72", "#FD79A8", "#6C5CE7", "#00B894", "#FF7675", "#D63031"
        ];

        // Shuffle the colors to randomize the assignment
        shuffleArray(colors);

        // Assign unique colors to each user
        const userColorMap = {};
        users.forEach((user, index) => {
            const firstLetter = user.username.charAt(0);
            const color = getColorForCharacter(firstLetter, colors);
            userColorMap[user.socketId] = color;
        });

        setUserColors(userColorMap);
    }, [users]);

    return (
        <div className="flex flex-col gap-4">
            {users.map((user) => (
                <User key={user.socketId} user={user} color={userColors[user.socketId]} />
            ))}
        </div>
    );
};

export default Users;
