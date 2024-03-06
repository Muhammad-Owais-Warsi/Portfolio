// LockScreen.jsx

import { useState, useEffect } from "react";


export default function LockScreen() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="lock-screen" style={{position:"relative",top:"-33px",fontSize: "18px"}}>
      <div className="date-day-container" style={{ display: "flex" }}>
        <div className="date">{formattedDate}</div>
      </div>
    </div>
  );
}
