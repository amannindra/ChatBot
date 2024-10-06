import "./chat.css";
import React, { useState } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";

function Chat() {
  const [userText, setuserText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (userText.trim() === "") return;
    // axios
    //   .post("http://localhost:8080/Gemini", { userText })
    //   .then((res) => {
    //     setChatHistory((chatHistory) => [
    //       ...chatHistory,
    //       { role: "user", content: userText },
    //       { role: "assistant", content: res.data },
    //     ]);
    //     console.log("data: " + res.data);
    //     setResponseText(res.data);

    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    setChatHistory((prev) => [
      ...prev,
      {
        role: "user",
        parts: [{ text: userText }],
      },
    ]);

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: userText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:8080/Gemini", options);
      const data = await response.text();
      console.log(data);

      setChatHistory((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: data }],
        },
      ]);

      setuserText("");
    } catch (error) {
      console.error(error);
    }


  };

  return (
    <div className="center">
      <div className="chat">
        <div className="chatText">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className= "model"
            >   
              {message.role === "model" ? 
              <img src={} /> : <img src={} />
              }


              <Markdown>{message.parts[0].text}</Markdown>
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
