/**
 * pastUploadRoutes.js
 *
 * This module defines a route for fetching a list of past video uploads from Firebase Storage,
 * specifically for the authenticated user. It utilizes Firebase Storage to store and retrieve
 * uploaded video files. Each video file's metadata includes a signed URL that provides temporary
 * access to the file, the name of the file, and the timestamp when the file was uploaded.
 *
 * The route is protected by an authentication middleware that ensures only authenticated users
 * can fetch their own uploaded videos. The authentication process relies on Firebase Authentication
 * tokens to verify the identity of the user making the request.
 *
 * Dependencies:
 * - express: A web framework for Node.js.
 * - firebase-admin: The Firebase Admin SDK, used to interact with Firebase services, including
 *   Authentication and Storage.
 *
 * Usage:
 * This route should be mounted in an Express application where authenticated users can request
 * a list of their video uploads. The response is a JSON array of objects, each representing a
 * video upload with its signed URL, name, and upload timestamp.
 */

const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/authenticateToken");
const { bucket } = require("../firebaseStorage");

/**
 * GET route handler to fetch a list of past video uploads for the authenticated user.
 *
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 */
router.get("/", authenticateToken, async (req, res) => {
  // Extract the user ID from the authenticated token.
  const uid = req.user.uid;

  // Define the prefix to filter files in Firebase Storage by user-specific uploads.
  const prefix = `uploads/${uid}/`;

  // Define the lifetime of the signed URL in milliseconds (3 hours in this case).
  const signedUrlLifetime = 60 * 3; // 3 hours

  try {
    // Fetch files from Firebase Storage that match the prefix.
    const [files] = await bucket.getFiles({ prefix });

    // Generate signed URLs for each file and collect their metadata.
    const uploads = await Promise.all(
      files.map(async (file) => {
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + signedUrlLifetime * 60 * 1000, // Convert hours to milliseconds
        });
        return {
          name: file.name,
          url: url,
          uploadDateTime: file.metadata.timeCreated,
        };
      })
    );

    // Sort uploads by descending upload date/time.
    uploads.sort(
      (a, b) => new Date(b.uploadDateTime) - new Date(a.uploadDateTime)
    );

    // Respond with the sorted list of uploads.
    res.status(200).json(uploads);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Failed to fetch uploads." });
  }
});

module.exports = router;
