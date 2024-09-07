import "./Mains.css";
import React from "react";
import Chat from "./chat/chat";
import Tabs from "./Tabs/Tabs.";

function Main() {
  return (
    <>
      <div className="Main">
        <Tabs />
        <div className="chat-container">
          <Chat />
        </div>
      </div>
    </>
  );
}

export default Main;
