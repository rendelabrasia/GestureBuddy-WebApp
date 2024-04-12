const createExtendedLabelMap = () => {
  // List of gestures based on your first format
  const gestures = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
    'A', 'B', 'Baby', 'C', 'D', 'E', 'ExcuseMe', 'F', 'G', 'H', 
    'Hello', 'HowAreYou', 'I', 'ILoveYou', 'J', 'K', 'L', 'M', 'MeetYou', 'My', 
    'N', 'Name', 'Nice', 'No', 'O', 'P', 'Q', 'R', 'S', 'T', 
    'TakeCare', 'ThankYou', 'U', 'V', 'W', 'X', 'Y', 'Yes', 'Your', 'Hello'
  ];

  // A simple array of colors to cycle through for each gesture
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  // Create the labelMap object
  let labelMap = {};

  gestures.forEach((gesture, index) => {
    // Assign each gesture a color from the colors array, cycling through the colors
    labelMap[index + 1] = {name: gesture, color: colors[index % colors.length]};
  });

  return labelMap;
};

// Usage
export const labelMap = createExtendedLabelMap();
console.log(labelMap);

// Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx) => {
  for (let i = 0; i < boxes.length; i++) {
    if (scores[i] > threshold) {
      console.log("Drawing rect");
        const [y, x, height, width] = boxes[i];
        const classIndex = classes[i]; // Assuming classes are 0-based and labelMap is 1-based
        const label = labelMap[classIndex + 1]; // Adjust index if necessary

        if (label) {
            ctx.strokeStyle = label.color;
            ctx.lineWidth = 10;
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';

            // Draw
            ctx.beginPath();
            ctx.fillText(`${label.name} - ${Math.round(scores[i] * 100) / 100}`, x * imgWidth, y * imgHeight - 10);
            ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth, height * imgHeight);
            ctx.stroke();
        }
    }
  }

}
