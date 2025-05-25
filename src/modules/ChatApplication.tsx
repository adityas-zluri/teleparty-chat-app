import { useState } from "react";
import JoinChatRoom from "./JoinChatRoom";
import CreateChatRoom from "./CreateChatRoom";
import defaultUserIcon from "../assets/defaultUserIcon.svg";

export default function ChatApplication() {
  const [nickname, setNickname] = useState("");
  const [userIcon, setUserIcon] = useState(null);

  const uploadUserIcon = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserIcon(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="chat_application_container">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={uploadUserIcon} />

        <img
          src={userIcon || defaultUserIcon}
          alt="Uploaded"
          height={30}
          width={30}
        />

        <JoinChatRoom />
        <CreateChatRoom userIcon={userIcon} nickname={nickname} />
      </div>
    </>
  );
}
