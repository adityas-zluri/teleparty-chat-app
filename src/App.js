import "./App.css";
import ChatRoom from "./modules/ChatRoom";
import ChatApplication from "./modules/ChatApplication";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<ChatApplication />} />
          <Route path="/room/:roomId" element={<ChatRoom />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
