// UnlockScreen.js
import React, { useState, useRef, useEffect } from 'react';
import './unlock.css'; // Import your CSS file for styling

export default function Unlock() {
  const [time, setTime] = useState('');

  const screenRef = useRef();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();
      const hours = newDate.getHours();
      const minutes = newDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
      const formattedTime = `${formattedHours < 10 ? '0' + formattedHours : formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
      setTime(formattedTime);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const unlock = () => {

      screenRef.current.style.display = "none";

  };

  return (
    <div className='lock' onClick={unlock} ref={screenRef}>
      <div className='charging' ><i className="fas fa-battery-quarter"></i></div>
      <div className='timing' >{time}</div>
    </div>
  );
}
