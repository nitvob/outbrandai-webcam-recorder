
# Outbrand.ai Webcam Recorder Application

## Overview

Welcome to the Outbrand.ai Webcam Recorder project! This application is designed to enable users to record videos directly from their webcam using a web interface. Built on the FEAN stack (Firebase, Express.js, Angular, Node.js), this project leverages the real-time capabilities of Firebase for storage and database management, along with the robust framework of Angular for the front-end, complemented by NG Prime components for a refined user interface.

## Purpose

The primary goal of this project is to enhance user engagement by allowing them to capture, review, confirm, and upload videos directly to Firebase Storage, while securely saving video metadata within the Firebase Realtime Database. This modern web application is part of the content revolution, pushing the boundaries of user-generated content and its management.

## Project Requirements

The application fulfills the following functionalities:

1. **Video Recording**: Users can capture videos from their webcam with the ability to start and stop the recording at will.
2. **Video Review and Confirmation**: After recording, users can review the video and choose to either confirm or redo the recording.
3. **Video Upload**: Confirmed videos are uploaded to Firebase Storage with a user-friendly interface indicating the upload progress.
4. **Saving Video Information**: Video metadata, including the storage path, is securely saved under the user's object in the Firebase Realtime Database.
5. **Testing and Documentation**: The application is thoroughly tested across various devices and browsers, with comprehensive documentation provided for setup and usage.

## Repository Structure

This repository is divided into two main sections:

- `frontend`: Contains the Angular application with NG Prime components. See [FRONTEND_README.md](./frontend/FRONTEND_README.md) for details.
- `backend`: Holds the Node.js and Express.js server code integrating with Firebase. See [BACKEND_README.md](https://github.com/nitvob/outbrandai-webcam-recorder/tree/main/backend) for more information.

## Getting Started

To get started with this project, you will need to set up both the frontend and backend portions of the application. Each part comes with its own README.md file that contains detailed instructions for setup, configuration, and usage.

- For frontend setup, please refer to [FRONTEND_README.md](./frontend/FRONTEND_README.md).
- For backend setup and configuration, see [BACKEND_README.md](./backend/BACKEND_README.md).

Please follow the instructions in these files to get the application up and running on your local development environment.
