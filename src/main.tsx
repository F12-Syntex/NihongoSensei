import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./demos/ipc";
import Homepage from "./components/homepage/Homepage";
import Sidebar from "./components/side_bar/Sidebar";
import KanjiData from "./kanji_data/KanjiData";
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'


const kanjiDataInstance = KanjiData.getInstance(); 
kanjiDataInstance.processAll();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="nihongo-sensei-container">
      <div className="nihongo-sensei-container-sidebar">
        <Sidebar />
      </div>
      <div className="nihongo-sensei-container-body">
        <Homepage />
      </div>
    </div>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
