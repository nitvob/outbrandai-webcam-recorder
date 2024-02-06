const express = require("express");
const router = express.Router();

// Middleware import if needed
const { authenticateToken } = require("../middleware/authenticateToken");
const { bucket } = require("../firebaseStorage");

router.get("/", authenticateToken, async (req, res) => {
  const uid = req.user.uid; // Extract UID from authenticated token
  const prefix = `uploads/${uid}/`; // Prefix to list user-specific uploads
  const signedUrlLifetime = 60 * 3; // 3 hrs

  try {
    const [files] = await bucket.getFiles({ prefix });
    const uploads = await Promise.all(
      files.map(async (file) => {
        // Generate signed URL for each file
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + signedUrlLifetime * 60 * 1000,
        });
        return {
          name: file.name,
          url: url,
          uploadDateTime: file.metadata.timeCreated,
        };
      })
    );

    uploads.sort((a, b) => {
      // Convert uploadDateTime to Date objects and compare
      return new Date(b.uploadDateTime) - new Date(a.uploadDateTime);
    });

    res.status(200).json(uploads);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Failed to fetch uploads." });
  }
});

module.exports = router;
