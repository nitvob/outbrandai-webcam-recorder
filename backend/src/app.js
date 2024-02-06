/**
 * app.js
 *
 * This is the main entry point for an Express.js web server application. It sets up the server,
 * configures middleware, and defines routes for handling HTTP requests. This application is designed
 * to provide APIs for uploading video files to Firebase Storage and fetching a list of past uploads
 * for authenticated users. It leverages Firebase Authentication to secure endpoints and ensure that
 * users can only access their own data.
 *
 * Dependencies:
 * - express: A fast, unopinionated, minimalist web framework for Node.js, used to create the web server
 *   and define HTTP request routes.
 * - cors: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS
 *   (Cross-Origin Resource Sharing) with various options.
 *
 * Configuration:
 * - The server listens on a port defined by the environment variable `PORT`, or defaults to 3000 if
 *   the environment variable is not set. This allows for flexible deployment across different environments.
 *
 * Middleware:
 * - CORS: The application uses the `cors` middleware to enable CORS for all routes, allowing front-end
 *   applications hosted on different domains to interact with the API.
 * - express.json(): This middleware is used to automatically parse JSON-formatted request bodies, making
 *   it easier to work with JSON data sent by clients.
 *
 * Routes:
 * - /api/upload: This route is handled by `uploadRoutes` and provides an endpoint for authenticated users
 *   to upload video files. The files are stored in Firebase Storage, and access is controlled based on
 *   user authentication.
 * - /api/past-uploads: Handled by `pastUploadRoutes`, this route provides an endpoint for authenticated
 *   users to fetch a list of their past video uploads, including metadata and signed URLs for accessing
 *   the videos.
 *
 * Usage:
 * To start the server, run `node app.js` from the command line in the project's root directory. The server
 * will start listening for HTTP requests on the specified port. The console will display a message indicating
 * that the server is running and the port it is listening on.
 *
 * This setup demonstrates a simple but effective pattern for structuring an Express.js application that
 * interacts with Firebase services. It separates concerns by defining route handlers in separate modules,
 * keeps configuration centralized in the `app.js` file, and provides a clear entry point for the application.
 */

const express = require("express");
const cors = require("cors");

// Import route handlers
const uploadRoutes = require("./routes/uploadRoutes");
const pastUploadRoutes = require("./routes/pastUploadRoutes");

// Initialize Express app
const app = express();

// Define the port to listen on, use environment variable or default to 3000
const port = process.env.PORT || 3000;

// Apply CORS middleware to enable cross-origin requests
app.use(cors());

// Use express.json() middleware for parsing application/json
app.use(express.json());

// Mount the routes
app.use("/api/upload", uploadRoutes);
app.use("/api/past-uploads", pastUploadRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
