import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import "./Swipecard.css";

const Swipecard = ({ options }) => {
  const [currentIndex, setCurrentIndex] = useState(options.length - 1);
  const [finalChoice, setFinalChoice] = useState(null);
  const childRefs = useRef(options.map(() => React.createRef()));

  const swiped = (direction, option, index) => {
    if (direction === "right") {
      console.log("✅ Accepted:", option);
      setFinalChoice(option); // store final choice
    } else if (direction === "left") {
      console.log("❌ Rejected:", option);
      setCurrentIndex(index - 1);
    }
  };

  const outOfFrame = (option) => {
    console.log(option, "left the screen");
  };

  const swipe = async (dir) => {
    if (finalChoice) return;
    if (currentIndex >= 0 && currentIndex < options.length) {
      await childRefs.current[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="swipe-wrapper">
      {!finalChoice ? (
        <>
          <div className="swipe-container">
            {options.map((option, index) => (
              <TinderCard
                ref={childRefs.current[index]}
                className="swipe"
                key={option}
                onSwipe={(dir) => swiped(dir, option, index)}
                onCardLeftScreen={() => outOfFrame(option)}
                preventSwipe={["up", "down"]}
              >
                <div className="swipe-card">{option}</div>
              </TinderCard>
            ))}
          </div>

          {/* ✅ ❌ Buttons on the background sides */}
          <button className="bg-btn reject" onClick={() => swipe("left")}>❌</button>
          <button className="bg-btn accept" onClick={() => swipe("right")}>✅</button>
        </>
      ) : (
        <div className="final-choice-overlay">
          <div className="final-choice-card">
            <h2> Your personalised activity:</h2>
            <div className="chosen-card">{finalChoice}</div>
            <button className="restart-btn" onClick={() => window.location.reload()}>
              🔄 Choose Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Swipecard;
