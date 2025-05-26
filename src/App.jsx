import React from "react";
import { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // asigură-te că importul e corect!
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import MyTrips from "./pages/MyTrips";
import SignUp from "./pages/SignUp";


export default function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem('user');
    setUser(null);
    setLoggedIn(false);
  };
  
  useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    if (userData.isAuthenticated) {
      setUser(userData);
      setLoggedIn(true);
    }
  }
}, []);

  return (
    <Router>
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage loggedIn={loggedIn} />} />
        <Route 
          path="/login" 
          element={
            loggedIn ? 
            <Navigate to="/mytrips" /> : 
            <LogIn setUser={setUser} setLoggedIn={setLoggedIn} />
          } 
        />
        <Route 
          path="/signup" 
          element={loggedIn ? <Navigate to="/mytrips" /> : <SignUp />} 
        />
        <Route 
          path="/mytrips" 
          element={
            loggedIn ? 
            <MyTrips user={user} /> : 
            <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}