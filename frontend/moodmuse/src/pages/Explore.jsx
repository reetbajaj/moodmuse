import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Explore.css";
import Lottie from "lottie-react";
import adventureAnimation from "../assets/adventure.json";
import cozyAnimation from "../assets/cozy.json";
import SwipeCards from "../components/Swipecard";

const adventureOptions = [
  "Catch a Sunset 🌅", "Dance in the Rain ☔", "Movie Marathon 🎬💥",
  "Food Quest: Spicy Challenge 🌶️", "Hike to a Secret Waterfall 🥾💦",
  "Jam at a Live Concert 🎸🎤", "Road Trip to Nowhere 🚗💨", "Camping under Stars ✨⛺",
  "Leap of Faith: Skydiving 🪂", "Snap Crazy Photos 📸🤪"
];

const cozyOptions = [
  "Build a Blanket Fort 🏰", "Snack & Chill 🍿😌", "Netflix & Pajamas 🎞️🛋️",
  "Mystery Book Hunt 📖🕵️‍♂️", "Puzzle & Brain Gym 🧩🧠", "Tea & Gossip ☕💬"
];

export const Explore = () => {
  const [selectedTriangle, setSelectedTriangle] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showCards, setShowCards] = useState(false);

  const handleSelectMood = (triangle) => {
    setSelectedTriangle(triangle);  // triangle that was clicked
    // Set mood after expand animation
    setTimeout(() => {
      setSelectedMood(triangle === "top" ? "cozy" : "adventure");
    }, 500); 

    // Show Tinder cards after 5 seconds
    setTimeout(() => {
      setShowCards(true);
    }, 1000); // 600ms + 5000ms
  };

  const options = selectedMood === "adventure" ? adventureOptions : cozyOptions;

  return (
    <div className="triangle-container">
      {/* Cozy Triangle */}
      <div
        className={`triangle top 
          ${selectedTriangle === "top" ? "expand" : ""} 
          ${selectedTriangle === "bottom" || showCards ? "vanish" : ""}`}
        onClick={() => handleSelectMood("top")}
      >
        <div className="triangle-content">
          <Lottie animationData={cozyAnimation} loop style={{ width: 300, height: 300 }} />
        </div>
        <span className="triangle-label cozy-label">Cozy 🏡</span>
      </div>

      {/* Adventure Triangle */}
      <div
        className={`triangle bottom 
          ${selectedTriangle === "bottom" ? "expand" : ""} 
          ${selectedTriangle === "top" || showCards ? "vanish" : ""}`}
        onClick={() => handleSelectMood("bottom")}
      >
        <div className="triangle-content">
          <Lottie animationData={adventureAnimation} loop style={{ width: 400, height: 400 }} />
        </div>
        <span className="triangle-label adventure-label">Adventure 🌄</span>
      </div>

      {/* Swipe Cards */}
      {showCards && (
        <div className="options-container">
          <SwipeCards options={options} />
        </div>
      )}
    </div>
  );
};
