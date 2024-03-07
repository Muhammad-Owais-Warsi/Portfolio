// UnlockScreen.js
import React, { useState, useRef, useEffect } from 'react';
import './unlock.css'; // Import your CSS file for styling
import LockScreen from './lockScreen.jsx';

export default function Unlock() {
  const [time, setTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState(null);


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

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        updateBatteryStatus(battery);

        battery.addEventListener('levelchange', () => {
          updateBatteryStatus(battery);
        });

      });
    } else {
      // The Battery Status API is not supported
      console.error('Battery Status API is not supported in this browser');
    }
  }, []);

  const updateBatteryStatus = (battery) => {
    setBatteryLevel((battery.level * 100).toFixed(0) + '%');

  };

  const unlock = () => {
    screenRef.current.style.display = "none";
  };

  return (
    <div className='lock' onClick={unlock} ref={screenRef} style={{ flexDirection: "column" }}>
      <div className='charging'>
       
        <span>{batteryLevel}</span>
      </div>
      <div className='timing'>{time}</div>
      <LockScreen></LockScreen>
    </div>
  );
}
