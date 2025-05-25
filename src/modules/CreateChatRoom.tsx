import { useNavigate } from "react-router-dom";
import client from "../client/teleparty-client";

export default function CreateChatRoom({ nickname, userIcon }) {
  const navigate = useNavigate();

  const createRoom = async () => {
    let roomId = await client.createChatRoom(nickname, userIcon);
    navigate(`/room/${roomId}`);
  };

  return (
    <>
      <button
        className="chat_application_button"
        onClick={createRoom}
        disabled={!nickname.trim()}
      >
        Create Private Room
      </button>
    </>
  );
}
