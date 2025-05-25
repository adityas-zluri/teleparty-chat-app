import { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../client/teleparty-client";

export default function JoinChatRoom({ nickname, userIcon }) {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const joinRoom = () => {
    client.joinChatRoom(nickname, roomId, userIcon).then((res) => {
      navigate(`/room/${roomId}`);
    });
  };

  return (
    <>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="chat_application_input"
        placeholder="Enter Room ID"
      />
      <button
        className="chat_application_button"
        onClick={joinRoom}
        disabled={!(nickname.trim() && roomId.trim())}
      >
        Join Private Room
      </button>
    </>
  );
}
