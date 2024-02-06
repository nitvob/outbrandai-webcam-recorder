const express = require("express");
const cors = require("cors");

// Import routes
const uploadRoutes = require("./routes/uploadRoutes");
const pastUploadRoutes = require("./routes/pastUploadRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // For parsing application/json

// Use the routes
app.use("/api/upload", uploadRoutes);
app.use("/api/past-uploads", pastUploadRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
