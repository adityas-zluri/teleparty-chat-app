import { useEffect, useRef, useState } from "react";
import telepartyIcon from "../assets/teleparty.svg";
import defaultUserIcon from "../assets/defaultUserIcon.svg";
import { SocketMessageTypes } from "teleparty-websocket-lib";
import client, { getCallbackForOnMessage } from "../client/teleparty-client";

export default function ChatRoom() {
  const scrollDiv = useRef(null);
  const { hash } = window.location;
  const roomId = hash.split("/")[2];

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getCallbackForOnMessage((message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  useEffect(() => {
    const el = scrollDiv.current;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
      body: message,
    });
    setMessage("");
  };

  const getMessageUI = (msg) => {
    const { type, data } = msg;
    const { body, timestamp, userNickname, userIcon, messageId } = data;
    if (type === SocketMessageTypes.SEND_MESSAGE) {
      return (
        <div className="chat_message" key={messageId}>
          <img src={userIcon || defaultUserIcon} height={30} width={30} />
          <div className="chat_message_card">
            <div className="chat_message_card_name_time">
              <div className="chat_message_card_name">{userNickname}</div>
              <div className="chat_message_card_time">
                {new Date(timestamp).toLocaleTimeString()}
              </div>
            </div>
            <div className="chat_message_card_text">{body}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="chat_room_container">
        <div className="chat_room_container_header">
          <img src={telepartyIcon} height={45} width={45} />
          <div className="chat_application_container_header">
            Teleparty Chat Application - Room {roomId}
          </div>
        </div>
        <div className="chat_box">
          <div ref={scrollDiv} className="chat_box_messages">
            {messages.map((msg: any) => getMessageUI(msg))}
          </div>
          <div className="chat_box_input_send_button">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="chat_box_input"
            />
            <button
              disabled={!message}
              onClick={sendMessage}
              className="chat_box_send_button"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
