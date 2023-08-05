import React from "react";
import ReactDOM from "react-dom/client";
import GeneralInfo from "./GeneralInfo.jsx";
import Education from "./Education.jsx";
import WorkExperience from "./WorkExperience.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GeneralInfo />
    <Education />
    <WorkExperience />
  </React.StrictMode>
);
