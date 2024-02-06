/**
 * firebaseStorage.js
 *
 * This module configures and initializes Firebase Admin SDK and Google Cloud Storage to interact
 * with Firebase Storage. It's designed to facilitate server-side operations on Firebase Storage,
 * such as uploading files, generating signed URLs, and managing storage objects within a specific
 * Firebase project. The configuration is tailored for a web server application that requires access
 * to Firebase services, including authentication and file storage.
 *
 * Dependencies:
 * - firebase-admin: The Firebase Admin SDK, enabling server-side interaction with Firebase features
 *   like Authentication, Firestore, and Storage.
 * - @google-cloud/storage: Provides convenient access to Google Cloud Storage features, required here
 *   for more advanced storage operations not covered directly by the Firebase Admin SDK.
 *
 * Configuration:
 * - The Firebase Admin SDK is initialized with credentials obtained from a service account JSON file.
 *   This file contains a private key and other identifiers for a service account associated with
 *   your Firebase project. The service account JSON file must be securely stored and should not be
 *   exposed publicly.
 *
 * - Google Cloud Storage is accessed through the Firebase Admin SDK's storage service. This setup
 *   allows for managing and interacting with files stored in Firebase Storage from the server side.
 *
 * - A specific storage bucket is identified and used for all operations. The bucket name usually follows
 *   the format "gs://[PROJECT_ID].appspot.com" and is tied to your Firebase project. This bucket is
 *   where all file uploads will be stored and managed.
 *
 * Usage:
 * This module exports the initialized `admin`, `storage`, and `bucket` instances. These can be used
 * throughout your application to perform various Firebase Storage operations, such as uploading files,
 * generating signed URLs for file access, and managing storage objects and their metadata.
 *
 * Example usage in an Express route handler:
 *
 * ```javascript
 * const { bucket } = require('./firebaseStorage');
 *
 * // Example: Upload a file to Firebase Storage
 * router.post('/upload', (req, res) => {
 *   const blob = bucket.file(req.file.originalname);
 *   const blobStream = blob.createWriteStream();
 *
 *   blobStream.on('error', err => {
 *     res.status(500).send({ message: 'Error uploading file', error: err });
 *   });
 *
 *   blobStream.on('finish', () => {
 *     // File uploaded successfully
 *     res.status(200).send({ message: 'File uploaded' });
 *   });
 *
 *   blobStream.end(req.file.buffer);
 * });
 * ```
 *
 * Ensure that the `serviceAccount.json` file path is correct and the file is present in your project.
 * This file is critical for authenticating your application's server-side code with Firebase and
 * should be kept secure and not included in public source control repositories.
 */

const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const serviceAccount = require("./serviceAccount.json");

// Initialize Firebase Admin with credentials from the service account file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get a reference to the default Firebase Storage bucket
const storage = admin.storage();
const bucket = storage.bucket("gs://outbrandai-webcam-recorder.appspot.com");

// Export the admin, storage, and bucket instances for use elsewhere in the application
module.exports = { storage, bucket, admin };
