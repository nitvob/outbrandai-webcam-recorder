import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router'; // Import Router

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {} // Inject Router here

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await this.afAuth.signInWithPopup(provider);
      this.router.navigate(['/dashboard']); // Navigate to dashboard after successful login
    } catch (error) {
      console.error(error);
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']); // Optionally navigate to login on logout
  }

  // AuthService method in Angular to get user token
  async getIdToken(): Promise<string> {
    return (await firebase.auth().currentUser?.getIdToken()) ?? '';
  }
}
