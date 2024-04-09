import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // for dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // for light mode icon
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FontSelector from './FontType';
import { DialogActions, Button } from '@mui/material';
import diagram from './American-Sign-Language-alphabet.png';


const SettingsDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [darkMode, setDarkMode] = useState(theme.palette.mode === 'dark');
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [fontSize, setFontSize] = useState(14); // Default font size, adjust as needed

  const applyFontSize = (size) => {
  document.body.style.fontSize = `${size}px`;
  // Or target a specific element or class to apply the font size
};

  const saveSettings = () => {
    const settings = {
      darkMode,
      fontSize,
      // Add any other settings you wish to save, like font type
    };
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement the theme change in your app's state
  };

  const handleClose = () => {
    setSelectedSetting(null);
    onClose();
  };

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('accessibilitySettings'));
    if (savedSettings) {
      setDarkMode(savedSettings.darkMode);
      setFontSize(savedSettings.fontSize);
      // Apply these settings as needed, e.g., applyFontSize(savedSettings.fontSize);
      // If you're saving the font type, load and apply it here as well
    }
  }, []);
  // ... (other imports and SettingsDialog component setup)

return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="settings-dialog-title"
      PaperProps={{
        style: {
          minWidth: '80%',
          maxWidth: '100%',
          height: '100%'
        },
      }}
    >
      <DialogTitle id="settings-dialog-title" sx={{ bgcolor: "background.default" }}>
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        Settings
      </DialogTitle>
      <Grid container spacing={2} sx={{ overflow: 'hidden' }}>
        <Grid item xs={12} md={4} lg={3} sx={{ borderRight: 1, borderColor: 'divider', height: 'calc(100vh - 48px)', overflowY: 'auto' }}>
          <List>
            <ListItem button onClick={() => setSelectedSetting('accessibility')}>
              <ListItemText primary="Accessibility" />
            </ListItem>
            <ListItem button onClick={() => setSelectedSetting('help')}>
              <ListItemText primary="Help and Tutorial" />
            </ListItem>
            <ListItem button onClick={() => setSelectedSetting('FAQs')}>
              <ListItemText primary="FAQs" />
            </ListItem>
            <ListItem button onClick={() => setSelectedSetting('about')}>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={8} lg={9} sx={{ height: 'calc(100vh - 48px)', overflowY: 'auto', p: 3 }}>
          {selectedSetting === 'accessibility' && (
        <>
        <h2>Accessibility </h2>
           <FormControlLabel
           label={darkMode ? 'Dark Mode' : 'Light Mode'}
           control={
             <Switch
               onChange={handleToggleDarkMode}
               checked={darkMode}
               icon={<Brightness4Icon />}
               checkedIcon={<Brightness7Icon />}
             />
           }
           labelPlacement="start" // This positions the label before the control (on the left)
           sx={{ marginLeft: 2 }} // Add some spacing if needed
         />
         <Typography variant="h6" sx={{ marginTop: 2 }}>
         Font Selection
       </Typography>
       <FontSelector />
       <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
      Font Size
    </Typography>
    <Slider
      aria-label="Font Size"
      value={fontSize}
      onChange={(event, newValue) => {
        setFontSize(newValue);
        applyFontSize(newValue);
      }}
      min={10}
      max={32}
      valueLabelDisplay="auto"
    />
      </>

          )}
          {selectedSetting === 'help' && (
           <div>
         <h2> Help And Tutorial </h2>
           <p>The image displays a visual guide to the American Sign Language (ASL) alphabet with illustrations of hands demonstrating the handshapes used to represent each letter from A through Z. Each gesture corresponds to a letter of the English alphabet, providing a means for non-verbal communication, particularly useful for the deaf and hard of hearing community. This guide could be an asset on a website focused on inclusivity, allowing users to familiarize themselves with basic sign language, thereby making the website's content more accessible to individuals who rely on ASL for communication.</p>
           <img src={diagram} alt="American Sign Language Alphabet" style={{ maxWidth: '100%', height: 'auto' }} />
         </div>  
          )}
          {selectedSetting === 'FAQs' && (
            <div>
              {/* Content for About */}
              <h2>Frequently Asked Questions</h2>
              <h3>FAQ 1: What is ASL?</h3>
              <p>American Sign Language (ASL) is a complete, natural language that has the same linguistic properties as spoken languages, with grammar that differs from English. ASL is expressed by movements of the hands and face. It's the primary language of many North Americans who are deaf and is one of several communication options used by people who are deaf or hard-of-hearing. </p>
              <h3> FAQ 2: How accurate are the ASL gestures depicted on the website?   </h3>
              <p>Our website utilizes a model trained on a large dataset of ASL gestures to interpret and demonstrate each sign. While we have strived for high accuracy, and our model performs quite well, it's important to note that no automated system is 100% accurate. Our app's translations of gestures are very close to standard ASL signs, but there may be nuances in personal signing styles or regional variations that the model might not capture. We continually improve our model based on user feedback and ongoing training to enhance its precision. For learning the full depth of ASL, including its nuances and subtleties, we still recommend studying with certified ASL instructors or practicing with native ASL users.  </p>
              <h3>  FAQ 3: Can the app translate ASL in real-time during a conversation?  </h3>
              <p>Yes, our app is designed to translate ASL in real-time. However, for the best results, we recommend signing at a steady pace and ensuring good lighting. Real-time translation is complex, and while our app performs well, we are constantly working to improve the speed and accuracy of translations.    </p>
              <h3> FAQ 4: Does the app work with different skin tones and lighting conditions?   </h3>
              <p>   Our model has been trained on a diverse dataset that includes various skin tones and lighting conditions. While performance may vary depending on these factors, the app is designed to be inclusive and adaptable to a wide range of users.  </p>
              <h3>  FAQ 5: Will this app teach me ASL?  </h3>
              <p>  The app provides a starting point for learning ASL, with translation features that can assist in understanding and practicing ASL signs. However, it's not a substitute for a structured learning program. We encourage users to use our app as a supplementary tool alongside formal education and practice with the deaf community.  </p>
            </div>
          )}
           {selectedSetting === 'about' && (
            <div>
              {/* Content for About */}
              <h2>About Us</h2>
              <h3>Meet the Innovators Behind Gesture Buddy</h3>
              <p>We are Rendel Abrasia, Huzaifa Ali, Majd Alber, and Abdul Mohammed, a dedicated team of fourth-year Computer Engineering students embarked on a groundbreaking journey. Our capstone project is more than just an academic milestone—it's a mission to bridge communication gaps and champion inclusivity.</p>
              <h3>Our Vision</h3>
              <p>In a world that thrives on communication, we believe in leaving no one behind. The Deaf and Hard of Hearing community faces significant barriers that hinder seamless interaction with others. Recognizing this challenge, we've developed Gesture Buddy —an emblem of innovation designed to transcend these barriers.</p>
              <h3>Innovation at Its Core</h3>
              <p>Our application stands at the intersection of advanced technology and human empathy. By leveraging the latest in machine learning and computer vision, we've created a tool that translates American Sign Language into written and spoken language in real-time. This isn't just technology at work; it's technology with a heart.</p>
              <h3>Our Aim</h3>
              <p>Our primary goal is to deliver an intuitive solution that enables effortless communication between individuals who use sign language and those who do not. We envision a future where conversations flow freely, without the hindrance of language barriers.</p>
            </div>
          )}
        </Grid>
      </Grid>
    <DialogActions style={{ position: 'absolute', bottom: 8, right: 8 }}>
    <Button onClick={saveSettings} variant="contained">Save</Button>
    </DialogActions>
    </Dialog>
  );
}
  export default SettingsDialog;  

          