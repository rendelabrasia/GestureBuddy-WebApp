# Gesture Guide

## Overview
Gesture Buddy is a web application designed to translate American Sign Language (ASL) gestures into written and spoken words in real-time. The project aims to enhance communication for the deaf and hard of hearing community by leveraging advanced machine learning and computer vision techniques.

## Authors
Rendel Abrasia

Huzaifa Ali

Majd Alber

Abdul Mohammed

## Features
- Real-time ASL gesture recognition

- Text-to-speech functionality

- User-friendly interface built with React

- Backend powered by Python and TensorFlow

- Scalable deployment on IBM Cloud

## Installation
### Prerequisites
- Node.js
- Python 3.7+
- TensorFlow
- OpenCV
- CUDA and cuDNN

### Clone the Repository
git clone https://github.com/username/gesture-buddy.git
cd gesture-buddy

### Backend Setup
1. Create a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

2. Install the required Python packages:
pip install -r requirements.txt

3. Set up TensorFlow and other dependencies:

### Frontend Setup
1. Navigate to the frontend directory:
cd frontend

2. Install the required Node.js packages:
npm install

## Usage
### Running the Backend
cd backend
python app.py

### Running the Frontend
cd frontend
npm start

Open your browser and navigate to http://localhost:3000 to use Gesture Buddy.

## Theory and Design
The project utilizes the SSD MobileNetV1 FPN architecture for efficient real-time object detection. Key components include:

**1.** **MobileNetV1 and Depthwise Separable Convolutions:** Reduces computational cost while maintaining performance.
**2.** **Feature Pyramid Network (FPN):** Enhances the model by integrating high-level semantic information across scales.
**3.** **SSD Framework:** Utilizes anchor boxes and loss functions for precise object detection.

## Materials and Components
Key software components used:

- Visual Studio Code (VSCode)
- Jupyter Notebook
- OpenCV
- TensorFlow Object Detection API
- CUDA and cuDNN
- Git
- IBM Cloud and Azure

## Performance Measurement Results
Key findings include:

**Detection Threshold:** Configured to display bounding boxes with a threshold probability of 0.7.

**Influence of Image Quality:** Performance affected by color, contrast, brightness, and gesture angle.

**Performance Tuning:** Optimal batch size of 32 identified for balancing detection accuracy and processing time.

## References

- "Accessibility to all: The importance of American Sign Language in everyday life," The Arbiter. [Online]. Available: Arbiter Online
- C. Cao et al., "A Review of 3D Hand Pose Estimation: Acquisition, Annotation, and Deep Learning Methods," Applied Sciences, vol. 12, no. 4, p. 1953, Jan. 2022.
- X. Dong et al., "The feature pyramid network (FPN) architecture," ResearchGate. [Online]. Available: ResearchGate
- Z. Cui et al., "TFace: A Trustworthy Face Recognition System Using Depth Information for Authentication and Protection," arXiv preprint arXiv:1911.09070, Nov. 2019.
- K. He et al., "Mask R-CNN," arXiv preprint arXiv:1704.04861, Apr. 2017.
- S. Saha, "Object Detection using YOLO and Mobilenet SSD," Analytics Vidhya, Sep. 2022. [Online]. Available: Analytics Vidhya
- A. Krizhevsky et al., "ImageNet Classification with Deep Convolutional Neural Networks," arXiv preprint arXiv:1311.2524, Nov. 2013.
- K. Simonyan and A. Zisserman. "Very Deep Convolutional Networks for Large-Scale Image Recognition," arXiv preprint, arXiv:1409.1556, 2014.
- W. Liu et al., "SSD: Single Shot MultiBox Detector," arXiv preprint arXiv:1512.02325, Dec. 2015.
- H. A. Rowley, S. Baluja, and T. Kanade. "Neural network-based face detection," TPAMI, 1998.
- S. Han, H. Mao, and W. J. Dally, "Deep compression: Compressing deep neural networks with pruning, trained quantization and Huffman coding," arXiv preprint arXiv:1510.00149, 2015.

