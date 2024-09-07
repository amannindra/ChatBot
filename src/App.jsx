import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Main from "./Main/Mains";
import Assist from "./assist/assist";

function App() {
  return (
    <>
      <div className="window">
        <Assist />
        <Main />  
      </div>
    </>
  );
}

export default App;
