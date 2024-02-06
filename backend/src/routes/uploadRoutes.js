const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { v4: uuidv4 } = require("uuid");

const { bucket } = require("../firebaseStorage");

// Middleware import if needed
const { authenticateToken } = require("../middleware/authenticateToken");

// Define your upload video routes here
router.post(
  "/",
  authenticateToken,
  upload.single("video"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const uid = req.user.uid; // Extract UID from authenticated token
    const fileName = `${uuidv4()}-${req.file.originalname}`;
    const file = bucket.file(`uploads/${uid}/${fileName}`);

    // Create a stream to write file to Firebase Storage
    const blobStream = file.createWriteStream({
      metadata: { contentType: req.file.mimetype },
    });

    blobStream.on("error", (err) => {
      res.status(500).json({ message: "Upload failed." });
    });

    blobStream.on("finish", () => {
      res.status(200).json({ message: "Successful upload." });
    });

    blobStream.end(req.file.buffer);
  }
);

module.exports = router;
