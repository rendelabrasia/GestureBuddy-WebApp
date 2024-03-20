import React, { useState } from 'react';
import WebFont from 'webfontloader';

const FontSelector = () => {
  const [font, setFont] = useState('Roboto'); // Default font

  const handleChange = (event) => {
    const selectedFont = event.target.value;
    setFont(selectedFont);

    // Load the selected font
    WebFont.load({
      google: {
        families: [selectedFont]
      }
    });

    // Apply the font to the body or a specific element
    document.body.style.fontFamily = selectedFont;
  };

  return (
    <select value={font} onChange={handleChange}>
      <option value="Roboto">Roboto</option>
      <option value="Open Sans">Open Sans</option>
      <option value="Lato">Lato</option>
      <option value="Montserrat">Montserrat</option>
      <option value="Ubuntu">Ubuntu</option>
      <option value="Oswald">Oswald</option>
      <option value="Noto Serif">Noto Serif</option>
      <option value="Lobster">Lobster</option>
      <option value="Russo One">Russo One</option>
      <option value="Amatic SC">Amatic SC</option>

      {/* Add more options as needed */}
    </select>
  );
};

export default FontSelector;
