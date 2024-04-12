// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network 
    // e.g. const net = await cocossd.load();

    const net = await tf.loadGraphModel('https://tensorflowjsrealtimemodel.capstone.s3.us-east.cloud-object-storage.appdomain.cloud/model.json');
    tf.setBackend('webgl');
    
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 30);
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

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 4. TODO - Make Detections
      // e.g. const obj = await net.detect(video);
      const img = tf.browser.fromPixels(video);  // Capture frame from video
      const resized = tf.image.resizeBilinear(img, [640, 480]);  // Resize to 320x320
      //const normalized = resized.div(tf.scalar(255.0));  // Normalize pixel values to [0,1]
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0);  // Add batch dimension
      const obj = await net.executeAsync(expanded);  // Execute model
      console.log(obj);
      
      const boxes = await obj[5].array()
      const classes = await obj[4].array()
      const scores = await obj[6].array()



      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)  

      requestAnimationFrame(()=>{drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx)}); 

      tf.dispose(img)
      tf.dispose(resized)
      //tf.dispose(normalized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-banner">
          <img src="/Gesture-Buddy-Logo.png" alt="Logo" style={{ height: '200px' }} />
        </div>
        <div className="webcam-canvas-container">
          <Webcam
            ref={webcamRef}
            className="Webcam"
            muted={true}
            style={{
              width: 640,
              height: 480,
            }}
          />
          <canvas
            ref={canvasRef}
            className="canvas"
            style={{
              width: 640,
              height: 480,
            }}
          />
        </div>
        {/* Placeholder for additional components */}
        <div className="additional-components">
          {/* Additional components will go here */}
        </div>
      </header>
    </div>
  );
}

export default App;