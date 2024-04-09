import './App.css';
import logo from './Gesture-Buddy-Logo.png';
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import MyButtons from './MyButtons'; // Make sure the import path is correct
import { drawRect } from "./utilities";
import * as tf from '@tensorflow/tfjs';



function App() {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
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

  // Main function
  const runCoco = async () => {
    // Set the TensorFlow.js backend
    await tf.setBackend('webgl'); // Set to 'webgl', 'wasm', 'cpu', or any other available backend
    await tf.ready(); // Wait for the backend to be ready

    // Now, you can load your model and proceed as before
    const net = await tf.loadGraphModel('https://tensorflowjsrealtimemodel.capstone.s3.us-east.cloud-object-storage.appdomain.cloud/model.json');

    // Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.7);
  };

  const detect = async (net) => {
 // Check data is available
 if (
  typeof webcamRef.current !== "undefined" &&
  webcamRef.current !== null &&
  webcamRef.current.video.readyState === 4
) {
  // Get Video Properties
  const video = webcamRef.current.video;
  const videoWidth = webcamRef.current.video.videoWidth;
  const videoHeight = webcamRef.current.video.videoHeight;

  // Set video width
  webcamRef.current.video.width = videoWidth;
  webcamRef.current.video.height = videoHeight;

  // Set canvas height and width
  canvasRef.current.width = videoWidth;
  canvasRef.current.height = videoHeight;

  // 4. TODO - Make Detections
  // e.g. const obj = await net.detect(video);
  const img = tf.browser.fromPixels(video)
  const resized = tf.image.resizeBilinear(img, [640,480])
  const casted = resized.cast('int32')
  const expanded = casted.expandDims(0)
  const obj = await net.executeAsync(expanded)
  console.log(obj)

  const boxes = await obj[1].array()
  const classes = await obj[2].array()
  const scores = await obj[4].array()

  // Draw mesh
  const ctx = canvasRef.current.getContext("2d");

  // 5. TODO - Update drawing utility
  // drawSomething(obj, ctx)  

  requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx)}); 

  tf.dispose(img)
  tf.dispose(resized)
  tf.dispose(casted)
  tf.dispose(expanded)
  tf.dispose(obj)
  }
  };

  useEffect(() => { runCoco(); }, []);

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
