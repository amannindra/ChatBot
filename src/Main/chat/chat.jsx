import "./chat.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function Chat() {
  const [userText, setuserText] = useState("");
  const [userlist, setuserlist] = useState([
    { AI: "Hi User" },
    { User: "Hi AI" },
  ]);
  const handleSend = () => {
    alert(userText);
    setuserlist((list) => [...{ User: userText }]);
    setuserText("");
    fetch("http://127.0.0.1:5000/datas");
  };

  useEffect(() => {
    

  }, [userlist]);

  return (
    <div className="center">
      <div className="chat">
        {userlist.map((entry, index) => {
          if (entry.AI) {
            return (
              <div className="AI" key={index}>
                {entry.AI}
              </div>
            );
          } else if (entry.User) {
            return (
              <div className="User" key={index}>
                {entry.User}
              </div>
            );
          }
        })}
      </div>

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
