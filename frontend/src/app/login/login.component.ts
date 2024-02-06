/**
 * login.component.ts
 *
 * This component serves as the login page for the Angular application. It utilizes the AuthService
 * to perform authentication, specifically offering a method to sign in with Google. This component
 * is part of the user authentication flow, directing users to authenticate before they can access
 * protected routes within the application.
 *
 * Dependencies:
 * - @angular/core: Provides the Component decorator for defining metadata about the component,
 *   including its selector, associated template, and styles.
 * - AuthService: A custom service that encapsulates the logic for authenticating users, including
 *   methods to sign in with Google and sign out.
 *
 * Component Decorator:
 * - selector: 'app-login' - Defines the custom HTML tag that Angular uses to insert an instance
 *   of this component into the DOM.
 * - templateUrl: Specifies the path to the HTML template file associated with this component.
 * - styleUrls: Contains an array of stylesheet paths that define the styling for the component.
 *
 * Constructor:
 * - authService: Injects the AuthService to enable calling its googleSignIn method.
 *
 * Methods:
 * - login(): This method is bound to a button click event in the component's template. When invoked,
 *   it calls the googleSignIn method from AuthService to authenticate the user with Google. On successful
 *   authentication, the AuthService is configured to navigate the user to a different route (typically
 *   the dashboard or home page of the application).
 *
 * Usage:
 * This component is used as the entry point for user authentication. It should be included in the
 * application's routing configuration to be accessible via a dedicated route (e.g., '/login'). The
 * login method provides an easy and intuitive way for users to initiate the sign-in process.
 *
 * Example usage in routing module (app-routing.module.ts):
 *
 * ```typescript
 * { path: 'login', component: LoginComponent }
 * ```
 *
 * This setup ensures that navigating to '/login' in the application displays the LoginComponent,
 * allowing users to sign in with their Google account.
 */

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  /**
   * Initiates the Google sign-in process.
   * This method is typically bound to a click event on a "Sign in with Google" button.
   */
  login() {
    // Delegate the sign-in process to the AuthService's googleSignIn method.
    this.authService.googleSignIn();
  }
}
