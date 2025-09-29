import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import { Explore } from "./pages/Explore";
import Login from "./pages/Login";
import { Journal } from "./pages/Journal";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);


  return (
    <div className="app-bg">
      <div className="bg-mm">MM</div>

      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/journal" element={<Journal user ={user} />} />
      </Routes>
    </div>
  );
};

export default App;
