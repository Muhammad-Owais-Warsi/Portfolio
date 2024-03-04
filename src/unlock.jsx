// UnlockScreen.js

import React, { useState } from 'react';
import './unlock.css'; // Import your CSS file for styling

const UnlockScreen = ({ onUnlock }) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSliderChange = (event) => {
    setSliderPosition(event.target.value);
  };

  const handleSliderRelease = () => {
    // Adjust the unlock threshold based on your design
    const unlockThreshold = 80;
    
    if (sliderPosition >= unlockThreshold) {
      setIsUnlocked(true);
      onUnlock(); // Callback to trigger the unlocking action
    } else {
      setSliderPosition(0); // Reset the slider position on unsuccessful attempt
    }
  };

  return (
    <div className={`unlock-screen ${isUnlocked ? 'unlocked' : ''}`}>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        className="slider"
        onChange={handleSliderChange}
        onMouseUp={handleSliderRelease}
        onTouchEnd={handleSliderRelease}
      />
    </div>
  );
};

export default UnlockScreen;
