import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // asigură-te că importul e corect!
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import MyTrips from "./pages/MyTrips";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/About";
import Privacy from "./pages/Privacy";
import "./css/App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Efect: aplică sau scoate .dark pe body la fiecare schimbare de temă
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem("user");
    setUser(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.isAuthenticated) {
        setUser(userData);
        setLoggedIn(true);
      }
    }
  }, []);

  return (
    <div className="app-container">
      <Navbar
        loggedIn={loggedIn}
        onLogout={handleLogout}
        theme={theme}
        setTheme={setTheme}
      />
      <Routes>
        <Route path="/" element={<HomePage loggedIn={loggedIn} />} />
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/mytrips" />
            ) : (
              <LogIn setUser={setUser} setLoggedIn={setLoggedIn} />
            )
          }
        />
        <Route
          path="/signup"
          element={loggedIn ? <Navigate to="/mytrips" /> : <SignUp />}
        />
        <Route
          path="/mytrips"
          element={
            loggedIn ? <MyTrips user={user} /> : <Navigate to="/login" />
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </div>
  );
}
