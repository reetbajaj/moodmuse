import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import "./Swipecard.css";

const Swipecard = ({ options }) => {
  const [currentIndex, setCurrentIndex] = useState(options.length - 1);
  const [finalChoice, setFinalChoice] = useState(null);
  const childRefs = useRef(options.map(() => React.createRef()));

  // ✅ Circular index helper
  const nextIndex = (index) => {
    if (index < 0) return options.length - 1;  // loop backward
    if (index >= options.length) return 0;     // loop forward
    return index;
  };

  // ✅ Swiped callback
  const swiped = (direction, option, index) => {
    if (direction === "right") {
      console.log("✅ Accepted:", option);
      setFinalChoice(option); // store final choice
    } else if (direction === "left") {
      console.log("❌ Rejected:", option);
      setCurrentIndex(nextIndex(index - 1)); // loop to first if at start
    }
  };

  const outOfFrame = (option) => {
    console.log(option, "left the screen");
  };

  // ✅ Button swipe handler
  const swipe = async (dir) => {
    if (finalChoice) return;
    if (currentIndex >= 0 && currentIndex < options.length) {
      await childRefs.current[currentIndex].current.swipe(dir);
      setCurrentIndex(nextIndex(currentIndex - 1)); // circular move
    }
  };

  return (
    <div className="swipe-wrapper">
      {!finalChoice ? (
        <>
          <div className="swipe-container">
            {options.map((option, index) =>
              index === currentIndex ? (
                <TinderCard
                  ref={childRefs.current[index]}
                  className="swipe"
                  key={option}
                  onSwipe={(dir) => swiped(dir, option, index)}
                  onCardLeftScreen={() => outOfFrame(option)}
                  preventSwipe={["up", "down"]}
                  style={{
                    zIndex: index === currentIndex ? 10 : 0,
                    display: index === currentIndex ? "block" : "none",
                  }}
                >
                  <div className="swipe-card">{option}</div>
                </TinderCard>
              ) : null
            )}
          </div>

          {/* ✅ ❌ Buttons */}
          <div className="button-container">
            <button className="bg-btn reject" onClick={() => swipe("left")}>
              ❌
            </button>
            <button className="bg-btn accept" onClick={() => swipe("right")}>
              ✅
            </button>
          </div>
        </>
      ) : (
        <div className="final-choice-overlay">
          <div className="final-choice-card">
            <h2>Your personalised activity:</h2>
            <div className="chosen-card">{finalChoice}</div>
            <button
              className="restart-btn"
              onClick={() => setFinalChoice(null)}
            >
              🔄 Choose Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Swipecard;
