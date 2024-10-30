import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes";

const App = () => {
  return (
    <div className="app-container">
      <div className="background-overlay"></div>
      <Router>
        <div className="content-container">
          <AppRoutes />
        </div>
      </Router>
    </div>
  );
};

export default App;
