// Hero.jsx
import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        
        <h1 className="hero-title">
          <span className="mood">MOOD</span> <span className="muse">MUSE</span>
        </h1>
        <p className="hero-tagline">Swipe your way to a perfect day</p>
        <button className="hero-button" onClick={()=> navigate("/explore")}>Swipe Now</button>
      </div>
    </section>
  );
};

export default Hero; // ✅ default export
