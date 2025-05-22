import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // asigură-te că importul e corect!
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
    </Router>
  );
}