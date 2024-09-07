import "./chat.css";
import React from "react";
import { useState } from "react";
function Chat() {
  const [userText, setuserText] = useState("");

  const handleSend = () => {
    alert(userText);
    setuserText("");
  };

  return (
    <div className="center">
      <div className="chat"></div>
      <div className="user_input">
        <input
          placeholder="input"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSend();
            }
          }}
          onChange={(e) => setuserText(e.target.value)}
          value={userText}
        ></input>
      </div>
    </div>
  );
}

export default Chat;
