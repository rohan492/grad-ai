import { useState } from "react";

import "./App.css";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import LogIn from './pages/Auth/Login.jsx'
import ChatWindow from './pages/ChatWindow/ChatWindow.jsx'
import Main from './pages/Main/Main.jsx'
import UploadComponent from './pages/Upload/Upload.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"))

  return (
    <Routes>
      {/* <Route
        path="/sign-up"
        element={<SignUp setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} />}
      /> */}
      <Route
        path="/login"
        element={<LogIn setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Main setIsLoggedIn={setIsLoggedIn} />
            // <ChatWindow />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="/" element={<Navigate to={"/chat"} />} />
        <Route path="/chat" element={<ChatWindow />} />
        <Route path="/upload" element={<UploadComponent />} />
      </Route>
    </Routes>
  );
}

export default App;
