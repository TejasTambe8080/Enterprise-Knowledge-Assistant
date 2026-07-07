import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";

function isAuthenticated() {
  return Boolean(localStorage.getItem("access_token"));
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={isAuthenticated() ? <Chat /> : <Navigate to="/login" replace />} />
        <Route path="/upload" element={isAuthenticated() ? <Upload /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Navigate to="/chat" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
