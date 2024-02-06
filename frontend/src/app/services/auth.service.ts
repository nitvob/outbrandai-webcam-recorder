/**
 * auth.service.ts
 *
 * This Angular service encapsulates the authentication logic for the application, particularly
 * focusing on integrating with Firebase Authentication for user authentication processes. It
 * provides methods for signing in with Google, signing out, and retrieving the current user's
 * ID token. This service is designed to be injected into components or other services that require
 * authentication functionalities.
 *
 * Dependencies:
 * - @angular/core: Provides the Injectable decorator, allowing this class to be injected as a
 *   dependency.
 * - @angular/fire/compat/auth: Provides the AngularFireAuth service to interact with Firebase
 *   Authentication in an Angular-friendly way.
 * - firebase/compat/app: Required to use Firebase SDK and specifically to create an authentication
 *   provider and access current user information.
 * - @angular/router: Used for navigating to different routes programmatically within the application.
 *
 * Usage:
 * The AuthService should be injected into components or other services that require functionalities
 * such as user login, logout, or token retrieval. The service utilizes the AngularFireAuth service
 * to perform these operations in conjunction with Firebase Authentication.
 *
 * Example usage (in a component):
 *
 * ```typescript
 * constructor(private authService: AuthService) {}
 *
 * login() {
 *   this.authService.googleSignIn();
 * }
 *
 * logout() {
 *   this.authService.signOut();
 * }
 * ```
 */

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  /**
   * Initiates the Google sign-in process using Firebase Authentication.
   * On successful sign-in, the user is redirected to the dashboard.
   */
  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await this.afAuth.signInWithPopup(provider);
      this.router.navigate(['/dashboard']); // Navigate to dashboard after successful login
    } catch (error) {
      console.error('SignIn Error:', error);
    }
  }

  /**
   * Signs the user out of the application using Firebase Authentication.
   * Optionally, navigates the user to the login page after signing out.
   */
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']); // Navigate to login after logout
  }

  /**
   * Retrieves the Firebase Authentication ID token for the currently signed-in user.
   *
   * @returns A promise that resolves to the current user's ID token, or an empty string if no user is signed in.
   */
  async getIdToken(): Promise<string> {
    return (await firebase.auth().currentUser?.getIdToken()) ?? '';
  }
}
