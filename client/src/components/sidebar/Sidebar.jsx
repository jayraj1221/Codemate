import { useAppContext } from "../../context/AppContext";
import SidebarHeader from "./SidebarHeader";
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
    <div className="h-full bg-rose-100 p-1">
     <SidebarHeader/>
      <ul>
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
