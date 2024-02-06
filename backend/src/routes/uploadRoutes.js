/**
 * uploadRoutes.js
 *
 * This module sets up an Express route for handling video file uploads by authenticated users.
 * It leverages Firebase Storage for storing the uploaded files, ensuring that each file is
 * associated with the user's unique identifier (UID) obtained from Firebase Authentication.
 * The `multer` library is used for handling multipart/form-data requests, which are typical
 * for file uploads. A unique identifier for each file is generated using the `uuid` library
 * to avoid naming conflicts and maintain a structured storage system.
 *
 * Dependencies:
 * - express: Framework for creating web server routes in Node.js applications.
 * - multer: Middleware for handling `multipart/form-data`, used for uploading files.
 * - uuid: Library for generating unique identifiers. Here, it ensures each uploaded file has a unique name.
 * - firebase-admin: Used for interacting with Firebase services, including Storage for file uploads.
 *
 * Usage:
 * The route defined in this module should be integrated into an Express application, allowing
 * authenticated users to upload video files. The route includes authentication middleware to
 * ensure that only authenticated requests can upload files. The uploaded files are stored in
 * Firebase Storage under a directory specific to each user, based on their UID.
 */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Configures multer to hold file data in memory
const { v4: uuidv4 } = require("uuid"); // For generating unique file names

const { bucket } = require("../firebaseStorage"); // Firebase Storage instance
const { authenticateToken } = require("../middleware/authenticateToken"); // Authentication middleware

/**
 * POST route to handle video file uploads.
 *
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 */
router.post(
  "/",
  authenticateToken,
  upload.single("video"), // Configures multer to accept a single file with the form field name 'video'.
  async (req, res) => {
    // Checks if the file was successfully received.
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Extracts the user ID from the authenticated token.
    const uid = req.user.uid;
    // Generates a unique file name to prevent overwriting existing files.
    const fileName = `${uuidv4()}-${req.file.originalname}`;
    // References a new file in Firebase Storage under the user's directory.
    const file = bucket.file(`uploads/${uid}/${fileName}`);

    // Creates a write stream to Firebase Storage for the file.
    const blobStream = file.createWriteStream({
      metadata: { contentType: req.file.mimetype }, // Sets the file's MIME type.
    });

    blobStream.on("error", (err) => {
      // Handles any errors that occur during the file upload process.
      console.error("Upload stream error:", err);
      res.status(500).json({ message: "Upload failed." });
    });

    blobStream.on("finish", () => {
      // Responds with a success message once the file is fully uploaded.
      res.status(200).json({ message: "Successful upload." });
    });

    // Ends the stream, triggering the upload to Firebase Storage.
    blobStream.end(req.file.buffer);
  }
);

module.exports = router;
