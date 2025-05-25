import { useState } from "react";
import client from "../client/teleparty-client";
import { useNavigate } from "react-router-dom";

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
      />

      <button
        className="join_chat_room_button"
        onClick={joinRoom}
        disabled={!(nickname.trim() && userIcon && roomId.trim())}
      >
        Join Private Room
      </button>
    </>
  );
}
