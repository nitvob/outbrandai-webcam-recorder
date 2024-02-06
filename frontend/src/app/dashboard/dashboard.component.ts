/**
 * dashboard.component.ts
 *
 * This Angular component acts as the main dashboard for the application, serving as a central
 * point where users can navigate to various parts of the application after they have logged in.
 * It includes functionalities such as logout, which allows users to sign out of the application
 * securely. The DashboardComponent is designed to be a secure area accessible only to authenticated
 * users, showcasing key features or information relevant to the user's experience.
 *
 * Dependencies:
 * - @angular/core: Provides the Component decorator to define metadata for the component.
 * - @angular/router: Used for navigating between routes programmatically within the application.
 * - AuthService: A custom service that encapsulates authentication logic, including signing out.
 * - @angular/common/http: Although injected, its specific use within this component may vary based
 *   on additional functionalities not shown here (e.g., fetching user-specific data).
 *
 * Component Decorator:
 * - selector: 'app-dashboard' - This allows the component to be used within HTML templates using
 *   the <app-dashboard></app-dashboard> tag.
 * - templateUrl: Points to the HTML file that defines the visual layout of the dashboard.
 * - styleUrls: Refers to the stylesheet(s) that apply styles to this component.
 *
 * Constructor:
 * The constructor injects instances of Router, AuthService, and HttpClient for use within the
 * component. These dependencies enable navigation, authentication actions, and HTTP requests,
 * respectively.
 *
 * Methods:
 * - logout(): This method handles the logout process. It calls the signOut method from AuthService
 *   to terminate the user's session and then redirects the user to the login page using the Router
 *   service. This ensures that users are securely signed out and returned to a non-authenticated
 *   state.
 *
 * Usage:
 * This component is typically used as part of the application's secure, authenticated section.
 * It might be rendered as a result of successful authentication, serving as a landing page or
 * hub from which users can access various features. Routing configurations would ensure it's
 * accessible only to authenticated users, possibly using route guards.
 *
 * Example usage in routing (app-routing.module.ts):
 *
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: 'dashboard',
 *     component: DashboardComponent,
 *     canActivate: [AuthGuard] // Ensure only authenticated users can access
 *   }
 * ];
 * ```
 *
 * This setup leverages Angular's routing mechanisms to protect the dashboard route, ensuring
 * it serves as a secure and user-specific interface within the application.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  /**
   * Handles user logout, signs out the user, and redirects to the login page.
   */
  logout(): void {
    // Perform sign out operation through AuthService
    this.authService.signOut();

    // Navigate to the login page after sign out
    this.router.navigate(['/login']); // Ensure this route leads to your login or landing page
  }
}
