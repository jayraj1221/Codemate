import { createContext, useContext, useState } from "react";
import { USER_STATUS } from "../types/user";
import ACTIVITY_STATE from "../types/activityState";

const initialData = {
  elements: [
    {
      id: "rectangle1",
      type: "rectangle",
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      strokeColor: "#000000",
      backgroundColor: "#ffffff",
      isDeleted: false,
    },
    {
      id: "text1",
      type: "text",
      x: 150,
      y: 120,
      text: "Hello, Excalidraw!",
      fontSize: 20,
      isDeleted: false,
    },
  ],
};

// Default context values
const defaultContextValues = {
  users: [],
  setUsers: () => {},
  currentUser: { username: "", roomId: "" },
  setCurrentUser: () => {},
  status: USER_STATUS.INITIAL,
  setStatus: () => {},
  activityState: ACTIVITY_STATE.IDLE,
  setActivityState: () => {},
  drawingData: initialData,
  setDrawingData: () => {},
};

const AppContext = createContext(defaultContextValues);

// Custom Hook
export const useAppContext = () => {
  return useContext(AppContext);
};

// App Provider Component
const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([{ username: "", roomId: "" }]);
  const [currentUser, setCurrentUser] = useState({ username: "", roomId: "" });
  const [status, setStatus] = useState(USER_STATUS.INITIAL);
  const [drawingData, setDrawingData] = useState(initialData);
  const [activityState, setActivityState] = useState(ACTIVITY_STATE.IDLE);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        status,
        setStatus,
        activityState,
        setActivityState,
        drawingData,
        setDrawingData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
export default AppContext;
