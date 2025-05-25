import { useEffect, useState } from "react";
import { SocketMessageTypes } from "teleparty-websocket-lib";
import client, { getCallbackForOnMessage } from "../client/teleparty-client";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getCallbackForOnMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  const sendMessage = () => {
    client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
      body: message,
    });
    setMessage("");
  };

  return (
    <>
      <div className="">
        {messages.map((msg: any) => (
          <>
            <div>{msg.data.body}</div>
          </>
        ))}
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button disabled={!message} onClick={sendMessage}>
          Send
        </button>
      </div>
    </>
  );
}
