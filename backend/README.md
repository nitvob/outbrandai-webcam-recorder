# Backend for Video Upload and Management Application

## Overview

The backend of this application provides a robust server-side solution for managing video uploads, storage, and retrieval. It interfaces with Firebase for authentication and storage, ensuring secure and scalable handling of user data and media files. This backend supports a web application that allows users to upload videos, view a list of their past uploads with secured access, and manage their content efficiently.

The backend is built with Node.js and Express, leveraging Firebase Admin SDK for authentication and Google Cloud Storage for storing video files. It's designed to work seamlessly with the frontend, offering endpoints for video upload and fetching past uploads, each protected with Firebase Authentication to ensure user data is kept private and secure.

## Setup

### Prerequisites

- Node.js and npm installed
- Firebase project created at [Firebase Console](https://console.firebase.google.com/)
- Service account key (JSON file) generated for your Firebase project

### Steps

1. **Clone the Repository**

   Start by cloning this repository to your local machine.

   ```sh
   git clone https://github.com/nitvob/outbrandai-webcam-recorder.git
   cd backend
   ```

2. **Install Dependencies**

   Install the Node.js dependencies specified in `package.json`.

   ```sh
   npm install
   ```

3. **Configure Firebase Admin SDK**

   Place your Firebase service account key JSON file in the backend directory and rename it to `serviceAccount.json`.

4. **Set Environment Variables**

   Optionally, you can set the `PORT` environment variable to specify the port on which the server should listen. If not set, the application defaults to port 3000.

5. **Start the Server**

   Run the server using Node.js.

   ```sh
   node app.js
   ```

   Your backend should now be running and listening for requests on the specified port.

## File Structure and Descriptions

- `/`
  - `app.js` - The entry point of the backend server. It sets up the Express application, middleware, and routes.
- `/middleware`
  - `authenticateToken.js` - Middleware to verify Firebase ID tokens and protect routes that require authentication.
- `/routes`
  - `uploadRoutes.js` - Defines routes for uploading videos. It handles file uploads and stores them in Firebase Storage.
  - `pastUploadRoutes.js` - Defines routes for fetching a list of past video uploads for the authenticated user.
- `/firebaseStorage.js` - Initializes Firebase Admin SDK and Google Cloud Storage, providing access to Firebase services.
- `serviceAccount.json` - The Firebase service account key for authenticating server-side operations. **This file should be kept secure and not included in public repositories.**
