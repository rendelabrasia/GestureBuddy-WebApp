import './App.css';
import logo from './Gesture-Buddy-Logo.png';
import React, { useState } from 'react';
import Webcam from "react-webcam";
import MyButtons from './MyButtons'; // Make sure the import path is correct

function App() {
  const [videoEnabled, setVideoEnabled] = useState(true);
  // ... other state and functions

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  const convertTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported.');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="Gesture Buddy Logo" className="app-logo" />
      </header>
      {videoEnabled && (
        <div className="video-feed" style={{ display: videoEnabled ? 'block' : 'none' }}>
          <Webcam
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "environment"
            }}
            mirrored={true} />
        </div>
      )}
      <div className="translation-section">
        Translation Appears Here
      </div>
      
      {/* Pass the props to MyButtons component */}
      <MyButtons 
        videoEnabled={videoEnabled} 
        toggleVideo={toggleVideo} 
        convertTextToSpeech={convertTextToSpeech} 
      />

    </div>
  );
}

export default App;
