import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file
import Unlock from './unlock.jsx';


export default function App() {
  const [time, setTime] = useState('');
  const [stream, setStream] = useState(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [batteryLevel,setBatteryLevel] = useState();


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

  const handleCameraClick = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(newStream);
      setCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleTakePhoto = () => {
    if (stream) {
      const videoElement = document.querySelector('video');
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const photoDataUrl = canvas.toDataURL('image/png');
      console.log('Photo Data URL:', photoDataUrl);
  
      // Download and save the photo
      const downloadLink = document.createElement('a');
      downloadLink.href = photoDataUrl;
      downloadLink.download = 'photo.png';
      downloadLink.click();
    } else {
      console.error('No camera stream available.');
    }
  };
  

  const handleReturnHome = () => {
    setCameraOpen(false);

    if (stream) {
      // Stop the video stream
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setStream(null);
    }
  };


  useEffect(() => {
    if('getBattery' in navigator) {
        navigator.getBattery()
        .then((battery) => {
          updateBatteryStatus(battery);

          battery.addEventListener("levelchange",() => {
            updateBatteryStatus(battery)
          })
        })

    }
  },[]);

  const updateBatteryStatus = (battery) => {
    setBatteryLevel((battery.level * 100).toFixed(0) + '%');

  };



  return (
    <div className="body">
  <Unlock></Unlock>
      <div className="parent">

        {!cameraOpen && (
          <>
            <div className="row-0">
              <div className='time'>{time}</div>
              <div className='cam'><i className="fas fa-circle"></i></div>
              <div className='charge'>{batteryLevel}</div>
            </div>

            <div className="row-1">
              <div className="icon-container">
                <a className="twitter icon" href="https://twitter.com/MO_warsi786">
                  <i class="fa-brands fa-x-twitter"></i>
                </a>
                <div className='head'>Twitter</div>
              </div>

              <div className="icon-container">
                <a className="linkedin icon" href="https://www.linkedin.com/in/muhammad-owais-warsi-318987276/" style={{backgroundColor:"rgb(10,102,194)"}}>
                  <i className="fab fa-linkedin"></i>
                </a>
                <div className='head'>LinkedIn</div>
              </div>

              <div className="icon-container">
                <a className="github icon" href="https://github.com/Muhammad-Owais-Warsi" style={{backgroundColor:"black"}}>
                  <i class="fa-brands fa-github" style={{color:"white"}}></i>
                </a>
                <div className='head'>GitHub</div>
              </div>
            </div>

            <div className="row-2">
              <div className="icon-container">
                <a className="hashnode icon" href="https://hashnode.com/@Owais78">
                  <i className="fab fa-hashnode"></i>
                </a>
                <div className='head'>Hashnode</div>
              </div>

              <div className="icon-container">
                <a className="resume icon" download href='../../public/SMU_PG_Resume_Template__1_ (3).pdf'>
                  <i className="fas fa-file"></i>
                </a>
                <div className='head'>Resume</div>
              </div>

              <div className="icon-container">
                <a className="mail icon" href="mailto:warsimuahmmadowais@gmail.com">
                  <i className="fas fa-envelope"></i>
                </a>
                <div className='head'>Mail</div>
              </div>
            </div>
          </>
        )}

        <div className='row-3'>
          {!cameraOpen ? (
            <button className='camera' onClick={handleCameraClick}><i className="fas fa-camera"></i></button>
          ) : (
            <>
              <button className='photo-btn' onClick={handleTakePhoto}><i className="fas fa-camera"></i></button>
              <button className='return-btn' onClick={handleReturnHome}><i className="fas fa-arrow-left"></i></button>
            </>
          )}
          {cameraOpen && (
            <div className="camera-container">
              {/* Render your camera component here */}
              <video autoPlay ref={(videoRef) => videoRef && (videoRef.srcObject = stream)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
