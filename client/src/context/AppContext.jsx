import { ReactNode, createContext, useContext, useState } from "react"
import  { USER_CONNECTION_STATUS, USER_STATUS, createRemoteUser, createUser } from "../types/user"

const defaultContextValues = {
    users: [],
    setUsers: () => {},
    currentUser: { username: "", roomId: "" },
    setCurrentUser: () => {},
    status: USER_STATUS.INITIAL,
    setStatus: () => {},
    // activityState: ACTIVITY_STATE.IDLE,
    // setActivityState: () => {},
    // drawingData: defaultDrawingData,
    // setDrawingData: () => {},
};

const AppContext = createContext(defaultContextValues);


export const useAppContext = () =>{
    const context = useContext(AppContext);
    if(!context)
    {
        throw new console.error("useAppContext must be used within a Appcontextprovider");
        
    }
    return context;
}
const AppProvider = ({children}) =>{
    const [users, setUsers] = useState([{username:"",roomId:""}]);
    const [currentUser, setCurrentUser] = useState({ username: "", roomId: "" });
    const [status, setStatus] = useState(USER_STATUS.INITIAL);
    return (
        <AppContext.Provider 
                value={{
                users,
                setUsers,
                currentUser,
                setCurrentUser,
                status,
                setStatus,
             }}
        >
        {children}
    </AppContext.Provider>
    );
}
export {AppProvider}
export default AppContext