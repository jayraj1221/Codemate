import { useAppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { users, currentUser } = useAppContext();

  // Ensure users and currentUser are available
  if (!users || !currentUser) {
    return (
      <div className="h-full bg-slate-100 p-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-100 p-4">
      <h2 className="font-semibold text-xl mb-4">Users</h2>
      <ul>
        {/* Display currentUser's name */}
        <li className="p-2 mb-2 bg-green-200 rounded-md">
          <strong>{currentUser.username}</strong> (You)
        </li>
        {users.map((user) => (
          <li key={user.id} className="p-2 mb-2 bg-gray-200 rounded-md">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
