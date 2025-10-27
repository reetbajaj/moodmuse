import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Explore.css";
import Lottie from "lottie-react";
import adventureAnimation from "../assets/adventure.json";
import cozyAnimation from "../assets/cozy.json";
import SwipeCards from "../components/Swipecard";

const adventureOptions = [
  "Chase a Sunrise on a Hilltop 🌄", 
  "Kayak through Calm Waters 🚣‍♀️", 
  "Midnight Drive with Loud Music 🚗🌌",
  "Spontaneous Road Trip 🎒🗺️", 
  "Zipline Through the Forest 🌲🪂", 
  "Beach Bonfire Night 🔥🌊",
  "Try an Extreme Sport (Rock Climb / Surf / Raft) 🧗🏄‍♀️", 
  "Hidden Café Hunt ☕🚶‍♂️",
  "Explore an Abandoned Place 🏚️🔦", 
  "Star-Gazing on a Mountain ⛰️✨", 
  "Go Scuba Diving or Snorkeling 🤿🐠",
  "Attend a Random Festival 🎭🎶",
  "Travel Without Google Maps 🧭😎",
  "Paragliding Over the Valley 🪂🌤️",
  "Plan a 24-Hour No-Plan Day 🕐🤯"
];


const cozyOptions = [
  "Cook a Comfort Meal from Scratch 🍝🧡", 
  "Read by Candlelight 🕯️📚", 
  "Write in Your Journal with Music 🎶🖊️", 
  "Have a Self-Care Spa Night 🛁🌸", 
  "Watch Rainfall from the Window 🌧️☕",
  "Make Homemade Hot Chocolate 🍫🥛",
  "Craft Something Creative (Paint, Knit, Doodle) 🎨🧶",
  "Digital Detox Day 📵🌿", 
  "Rewatch a Childhood Favorite 🎬🎈", 
  "Rearrange Your Room for Fresh Vibes 🛋️🪴", 
  "Bake Cookies or Cake 🍪🎂",
  "Do Nothing Guilt-Free 😌🧘‍♀️",
  "Listen to Vinyls or Lo-Fi Beats 🎧💿",
  "Call a Friend You Miss 📞❤️",
  "Create a Mini Memory Scrapbook 📸✂️"
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
