/**
 * auth.guard.ts
 *
 * This TypeScript file defines an Angular guard, specifically an implementation of CanActivate,
 * used for protecting routes that should only be accessible to authenticated users. It integrates
 * with Firebase Authentication (via AngularFireAuth) to check the user's authentication state
 * before allowing access to certain routes within the Angular application.
 *
 * The guard's primary role is to intercept navigation to a route, determine if the user is
 * authenticated, and then either allow or prevent the navigation based on that authentication state.
 * If the user is not authenticated, they are redirected to the login page.
 *
 * Dependencies:
 * - @angular/core: Provides the Injectable decorator to define this class as a service that can
 *   be injected.
 * - @angular/router: Provides the CanActivate interface and Router class for route protection and
 *   navigation.
 * - @angular/fire/compat/auth: Provides the AngularFireAuth service for interacting with Firebase
 *   Authentication in an Angular application.
 * - rxjs/operators: Provides the map operator for transforming the observable stream of authentication
 *   state.
 *
 * Usage:
 * To use this guard, it must be provided in the routing configuration of the Angular application
 * where route protection is required. Here's an example of protecting a route:
 *
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'protected-route',
 *     component: ProtectedComponent,
 *     canActivate: [AuthGuard] // Protect this route with AuthGuard
 *   }
 * ];
 * ```
 *
 * This setup ensures that navigation to 'protected-route' is only allowed if the user is authenticated.
 * Otherwise, the user is redirected to the login page.
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  /**
   * Determines if a route can be activated based on the user's authentication state.
   *
   * @returns An observable that resolves to a boolean value indicating whether the route can be activated.
   */
  canActivate() {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          // If a user is authenticated, allow access to the route
          return true;
        } else {
          // If no user is authenticated, redirect to the login page and prevent access to the route
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
