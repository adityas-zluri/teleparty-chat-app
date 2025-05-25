import { useRef, useState } from "react";
import JoinChatRoom from "./JoinChatRoom";
import CreateChatRoom from "./CreateChatRoom";
import defaultUserIcon from "../assets/defaultUserIcon.svg";

export default function ChatApplication() {
  const uploadButtonRef = useRef(null);

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

  const handleUploadButtonClick = () => {
    uploadButtonRef.current.click();
  };

  return (
    <>
      <div className="chat_application_container">
        <div className="chat_application_container_logo_header">
          <img
            src={`https://play-lh.googleusercontent.com/5AJ3dpVdbd1S73OJxh-WQXAkWvz79cHBQa-i2h9DbMb1OcwgID-1I5SpHTwmhl1-Trc`}
            height={250}
            width={250}
          />
          <div className="chat_application_container_header">
            Teleparty Chat Application
          </div>
        </div>
        <div className="chat_application_container_user_details">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="chat_application_input"
            placeholder="Enter your name"
          />
          <input
            hidden={true}
            type="file"
            accept="image/*"
            ref={uploadButtonRef}
            onChange={uploadUserIcon}
          />
          <img
            src={userIcon || defaultUserIcon}
            alt="Uploaded"
            height={60}
            width={60}
            className="chat_application_user_icon"
          />
          <button
            className="chat_application_button"
            onClick={handleUploadButtonClick}
          >
            Upload Avatar
          </button>
        </div>
        <div className="chat_application_create_join_chat_room">
          <CreateChatRoom userIcon={userIcon} nickname={nickname} />
          <div className="chat_application_create_join_chat_room_divider">
            <hr style={{ width: "100%" }} />
            <div>OR</div>
            <hr style={{ width: "100%" }} />
          </div>
          <JoinChatRoom userIcon={userIcon} nickname={nickname} />
        </div>
      </div>
    </>
  );
}
