import "./chat.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function Chat() {
  const [userText, setuserText] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "AI", text: "Hi User" },
    { sender: "User", text: "Hi AI" },
  ]);
  const handleSend = () => {
    // alert(userText);
    setChatHistory((prev) => [...prev, { sender: "User", text: userText }]);
    console.log(chatHistory);
    setuserText("");
    axios({
      method: "post",
      url: "http://localhost:5000/sendData",
      ContentType: "application/json",
      data: {
        chatHistory: chatHistory,
      },
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    // Fetch AI response
    fetch("http://localhost:5000/sendData")
      .then((response) => response.json())
      .then((data) => {
        // Append AI response to chat history
        setChatHistory((prev) => [...prev, { sender: "AI", text: data }]);
        console.log(data);
      });
  }, []);

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
          placeholder="input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
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
