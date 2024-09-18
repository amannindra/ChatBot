import "./chat.css";
import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [userText, setuserText] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "AI", text: "Hi User" },
    { sender: "User", text: "Hi AI" },
  ]);

  const handleSend = () => {
    if (userText.trim() === "") return;

    const newChatHistory = [...chatHistory, { sender: "User", text: userText }];

    axios.post(
      "http://localhost:5000/getData",
      {
        chatHistory: newChatHistory,
        message: userText,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  return (
    <div className="center">
      <div className="chat">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "AI" ? "AI" : "User"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="user_input">
        <input
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          onChange={(e) => setuserText(e.target.value)}
          value={userText}
        />
      </div>
    </div>
  );
}

export default Chat;
