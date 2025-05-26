import { useEffect, useState } from "react";
import "./App.css";
import ChatRoom from "./modules/ChatRoom";
import ChatApplication from "./modules/ChatApplication";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCallbackForOnConnectionReady } from "./client/teleparty-client";

function App() {
  const [connectIsEstablished, setConnectionIsEstablished] = useState(false);

  useEffect(() => {
    getCallbackForOnConnectionReady(() => {
      setConnectionIsEstablished(true);
    });
  }, []);

  return (
    <>
      {connectIsEstablished ? (
        <>
          <HashRouter>
            <Routes>
              <Route path="/home" element={<ChatApplication />} />
              <Route path="/room/:roomId" element={<ChatRoom />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </HashRouter>
        </>
      ) : (
        <>
          <div className="chat_application_container">
            <div className="chat_spinner" />
          </div>
        </>
      )}
    </>
  );
}

export default App;
