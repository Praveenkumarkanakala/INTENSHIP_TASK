import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SensorRegistration from "./components/SensorRegistration";
import SensorList from "./components/SensorList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/sensor-registration" element={<SensorRegistration />} />
        <Route path="/sensor-list" element={<SensorList />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
