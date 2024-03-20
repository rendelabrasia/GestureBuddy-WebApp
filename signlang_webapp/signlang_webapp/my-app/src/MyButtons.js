import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TextToSpeechIcon from '@mui/icons-material/RecordVoiceOver';
import './App.css';
import React, { useState } from 'react';
import SettingsDialog from './Settings';

const MyButtons = ({ videoEnabled, toggleVideo, convertTextToSpeech }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleOpenSettings = () => {
      setIsSettingsOpen(true);
    };
  
    const handleCloseSettings = () => {
      setIsSettingsOpen(false);
    };

    return (
        <div className="buttons-container">
         <div className="button-group">
          <IconButton aria-label="settings" onClick={handleOpenSettings} sx={{color:'#E0E0E0'}}
          className={"round-button"}
         
          >        
            <SettingsIcon />
          </IconButton>
          <div className="button-label">Settings</div>
          <SettingsDialog open={isSettingsOpen} onClose={handleCloseSettings} />
        </div>
  
        <div className="button-group">
          <IconButton aria-label="toggle camera" sx={{
        // Regular state
        color: 'gray',
        transition: '0.3s', // Smooth transition for hover effect
        '&:hover': {
          // Hover state
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          color: '#A9A9A9',
        },
        '&:active': {
          // Active state (when the button is clicked)
          color: '#FFFFFF',
        },
      }}  className="round-button" onClick={toggleVideo}>
            <CameraAltIcon />
          </IconButton>
          <div className="button-label">{videoEnabled ? 'Turn Off' : 'Turn On'} Camera</div>
        </div>
  
        <div className="button-group">
          <IconButton aria-label="speak" sx={{color:'#E0E0E0'}} className="round-button" onClick={() => convertTextToSpeech('Hello, this is a test')}>
            <TextToSpeechIcon />
          </IconButton>
          <div className="button-label">Speak</div>
        </div>
      </div>
    );
  };
  

export default MyButtons;
