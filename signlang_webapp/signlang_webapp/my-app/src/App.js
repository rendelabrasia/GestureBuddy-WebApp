import './App.css';
import React, { useState } from 'react';
import Webcam from "react-webcam";

function App() {
  const [videoEnabled, setVideoEnabled] = useState(true);

  const videoConstraints = {
    width: 1280,  // Specify your desired width
    height: 720,  // Specify your desired height
    facingMode: "user"
  };

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
      {videoEnabled && (
       <div className="video-feed" style={{ display: videoEnabled ? 'block' : 'none' }}>
          <Webcam
          
          videoConstraints={videoConstraints}
          mirrored = {true} />
          
        </div>
      )}
      <div className="translation-section">
        Translation Appears Here
      </div>
      <div className="controls">
        <button onClick={() => {}}>Settings</button>
        <button onClick={toggleVideo}>{videoEnabled ? 'Turn Off' : 'Turn On'} Video</button>
        <button onClick={() => convertTextToSpeech('Sample Text')}>Text to Speech</button>
      </div>
    </div>
  );
}

export default App;
