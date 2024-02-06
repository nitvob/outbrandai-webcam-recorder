/**
 * authenticateToken.js
 *
 * This module provides middleware for authenticating requests in an Express application
 * using Firebase Authentication. It verifies the Firebase ID token that should be included
 * in the Authorization header of incoming requests. This token is typically obtained from
 * the client side after a user signs in with Firebase Authentication.
 *
 * The middleware checks for the presence of a "Bearer" token in the Authorization header,
 * extracts the token, and uses the Firebase Admin SDK to verify its validity. If the token
 * is valid, the middleware adds the decoded token to the request object (as `req.user`),
 * allowing subsequent middleware or route handlers to access the authenticated user's information.
 * If the token is missing, invalid, or expired, the middleware sends an appropriate HTTP response
 * indicating that the request is unauthorized.
 *
 * Dependencies:
 * - firebase-admin: The Firebase Admin SDK, used to verify ID tokens and interact with Firebase services.
 *
 * Usage:
 * To use this middleware, import it into your Express application and include it in the middleware chain
 * for routes that require authentication. For example:
 *
 * const { authenticateToken } = require('./path/to/authenticateToken');
 * app.use('/api/private', authenticateToken, privateRouteHandler);
 *
 * This will protect all routes under "/api/private" so that only requests with a valid Firebase ID token
 * are allowed through.
 */

const admin = require("firebase-admin");

/**
 * Middleware to authenticate and check the Firebase ID token.
 *
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @param {Function} next - The next middleware function in the Express middleware chain.
 *
 * @returns If authentication fails, it sends an HTTP 401 or 403 response. Otherwise, it calls `next()`
 * to pass control to the next middleware function.
 */
const authenticateToken = async (req, res, next) => {
  // Extract the Authorization header from the incoming request.
  const header = req.headers.authorization;

  // If the header is missing or does not start with "Bearer ", send a 401 Unauthorized response.
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).send("No token provided");
  }

  // Extract the token from the header.
  const token = header.split("Bearer ")[1];

  try {
    // Use the Firebase Admin SDK to verify the ID token.
    const decodedToken = await admin.auth().verifyIdToken(token);

    // If verification succeeds, attach the decoded token to the request object.
    req.user = decodedToken;

    // Pass control to the next middleware function.
    next();
  } catch (error) {
    // If token verification fails, log the error and send a 403 Forbidden response.
    console.error("Error verifying auth token", error);
    res.status(403).send("Unauthorized");
  }
};

module.exports = { authenticateToken };
