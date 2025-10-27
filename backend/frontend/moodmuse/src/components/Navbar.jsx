import React from "react";
import logo from "../assets/logo.png";
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

  const handleProfileClick = () => {
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <img src={logo} alt="logo" className="navbar-logo" />

      {/* Navigation Links */}
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

      {/* Right Section (Profile + Welcome User) */}
      <div className="navbar-right">
        {/* Profile Icon */}
        <div className="navbar-profile" onClick={handleProfileClick}>
          <img src={acc} alt="Profile" className="profile-pic" />
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
