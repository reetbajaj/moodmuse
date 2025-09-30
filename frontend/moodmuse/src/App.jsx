import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import { Explore } from "./pages/Explore";
import Login from "./pages/Login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="app-bg">
      <div className="bg-mm">MM</div>

      {/* pass user and setUser */}
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </div>
  );
};

export default App;
