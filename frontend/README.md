
# Frontend Application

## Overview

The frontend part of the application serves as the user interface for a video recording and uploading platform. It is built using Angular and integrates with Firebase for authentication and backend services. The application provides a seamless experience for users to record videos through their web browser, review their recordings, and upload them securely to the backend. The frontend is designed to be intuitive, responsive, and accessible across various devices and browsers.

## Setup

To get started with the frontend application, follow these steps:

1. Navigate to the `frontend` directory in your terminal.
2. Install the required node modules by running `npm install`.
3. Start the development server with `npm start`. The application will be available at `http://localhost:4200` by default.
4. Build the application for production with `ng build --prod`. The build artifacts will be stored in the `dist/` directory.

## File Structure

Below is an overview of the key directories and files within the frontend application:

### Components

- `CreateVideo`: Contains logic and views related to video recording and uploading.
- `dashboard`: Acts as the main hub post-authentication, providing navigation to different features.
- `login`: Manages user sign-in functionality using Google authentication.
- `past-uploads`: Displays a list of previously uploaded videos by the user.

### Guards

- `auth.guard.ts`: Protects routes to ensure they are only accessible by authenticated users.

### Pipes

- `safe-url.pipe.ts`: A custom pipe to sanitize resource URLs for safe embedding within the application.

### Services

- `api.service.ts`: Handles all HTTP interactions with the backend API, including video uploads and fetching past uploads.
- `auth.service.ts`: Manages Firebase authentication, including sign-in and sign-out functionalities.

## Important Files

- `app-routing.module.ts`: Defines the application's routing configuration, linking URLs to components.
- `app.component.*`: The root component files that bootstrap the application.
- `app.module.ts`: The main module that declares and provides all the application's components and services.
