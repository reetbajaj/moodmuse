import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
import acc from "../assets/acc.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbarstyle.css";

export const Navbar = ({ user, setUser }) => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Journal", path: "/journal" },
    { name: "Login/Signup", path: "/login" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // critical to update App state
    setProfileOpen(false);
    navigate("/"); // redirect to home
  };

  return (
    <header className="navbar">
      <img src={logo} alt="logo" className="navbar-logo" />

      <nav className="navbar-links">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`navbar-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="navbar-right">
        {/* Search */}
        <div className="navbar-search-container" ref={searchRef}>
          <img
            src={search}
            alt="search"
            className="navbar-search-icon"
            onClick={() => setShowSearch(!showSearch)}
          />
          <input
            type="text"
            className={`navbar-search ${showSearch ? "active" : ""}`}
            placeholder="Search..."
            autoFocus={showSearch}
          />
        </div>

        {/* Profile Icon */}
        <div
          className="navbar-profile"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img src={acc} alt="Profile" className="profile-pic" />
          {profileOpen && user && (
            <div className="profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

        {/* Welcome User */}
        {user && (
          <div className="navbar-welcome">
            <strong>{user.name}</strong>
          </div>
        )}
      </div>
    </header>
  );
};
