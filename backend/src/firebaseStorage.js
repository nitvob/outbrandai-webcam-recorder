// firebaseStorage.js
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const serviceAccount = require("./serviceAccount.json");

// initialize firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const storage = admin.storage();

const bucket = storage.bucket("gs://outbrandai-webcam-recorder.appspot.com");

module.exports = { storage, bucket, admin };
