import "./chat.css";
import React, { useState } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";

function Chat() {
  const [userText, setuserText] = useState("");
  const [chatHistory, setChatHistory] = useState([

  ]);
  const [responseText, setResponseText] = useState("");

  const handleSend = () => {
    if (userText.trim() === "") return;
    axios
      .post("http://localhost:8080/Gemini", { userText })
      .then((res) => {
        setChatHistory((chatHistory) => [
          ...chatHistory,
          { role: "user", content: userText },
          { role: "assistant", content: res.data },
        ]);
        console.log("data: " + res.data);
        setResponseText(res.data);

      })
      .catch((err) => {
        console.error(err);
      });
      setuserText("");

  };

  return (
    <div className="center">
      <div className="chat">
        <div className="chatText">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.role === "assistant" ? "assistant" : "user"
              }`}
            >
              <Markdown>{message.content}</Markdown>
            </div>
          ))}
        </div>
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
