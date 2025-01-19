// import './App.css'
import Home from "./components/pages/Home";
import EditorPage from "./components/pages/EditorPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Toast from "./components/toast/Toast";
import { AppProvider } from "./context/AppContext";
import { SocketProvider } from "./context/SocketContext";
import { ViewProvider } from "./context/ViewContext";
import { ChatContextProvider } from "./context/ChatContext";
function App() {
  return (
    <Router>
      <AppProvider>
        <SocketProvider>
          <ViewProvider>
            <ChatContextProvider>
              <Routes>
                <Route path="/" element={<Home/>} />
                  <Route path="/editor/:roomId" element={<EditorPage />} />
              </Routes>
            </ChatContextProvider>
          </ViewProvider>
        </SocketProvider>
      </AppProvider>
      <Toast />
    </Router>
  );
}
export default App;
