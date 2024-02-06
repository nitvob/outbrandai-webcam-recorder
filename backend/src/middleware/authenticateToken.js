const admin = require("firebase-admin");

// Middleware to authenticate and check the Firebase ID token
const authenticateToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).send("No token provided");
  }
  const token = header.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying auth token", error);
    res.status(403).send("Unauthorized");
  }
};

module.exports = { authenticateToken };
