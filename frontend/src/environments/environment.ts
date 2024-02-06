/**
 * environment.ts
 *
 * This file defines the configuration object for the Angular application environment. It specifies
 * various settings that control how the application behaves in different environments, such as
 * development, staging, or production. This particular configuration is intended for development
 * purposes, as indicated by the `production` property set to `false`.
 *
 * Properties:
 * - production: A boolean flag indicating whether the application is running in production mode.
 *   This affects various aspects of Angular's behavior, including error reporting and performance
 *   optimizations. For development, this is set to `false`.
 * - apiUrl: The base URL for the backend API. This is used throughout the application to make HTTP
 *   requests to the server. The development configuration typically points to a local development
 *   server.
 * - firebaseConfig: An object containing configuration settings for Firebase services used by the
 *   application. This includes settings such as the API key, project ID, and other identifiers
 *   required to initialize and use Firebase services such as Authentication and Firestore.
 *
 * Usage:
 * The environment configuration can be imported and used in various parts of the application to
 * access environment-specific settings. For example, when making HTTP requests to the backend API,
 * the `apiUrl` can be used to construct the request URL.
 *
 * Example usage:
 *
 * ```typescript
 * import { environment } from '../environments/environment';
 *
 * const apiUrl = environment.apiUrl;
 * ```
 *
 * Note: For security reasons, it's important to avoid placing sensitive information directly in
 * source files that are stored in version control systems. Consider using environment variables
 * or secure storage solutions for sensitive keys and identifiers in production environments.
 */

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  firebaseConfig: {
    apiKey: 'AIzaSyC0QbsuMHvTwP4Z9swMXm4dflTWrZI3Scc',
    authDomain: 'outbrandai-webcam-recorder.firebaseapp.com',
    projectId: 'outbrandai-webcam-recorder',
    storageBucket: 'outbrandai-webcam-recorder.appspot.com',
    messagingSenderId: '133253747398',
    appId: '1:133253747398:web:4fff7b8e8db2f0306ebdc7',
    measurementId: 'G-P4M870JQYE',
  },
};
