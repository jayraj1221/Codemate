// import './App.css'
import {Home,EditorPage} from './components/pages/Home'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Toast from "./components/toast/Toast"

function App() {

  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </Router>
      <Toast />
    </>
  )
}

export default App
