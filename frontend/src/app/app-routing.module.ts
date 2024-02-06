/**
 * AppRoutingModule (app-routing.module.ts)
 *
 * This module defines the routing configuration for the Angular application. It uses Angular's
 * RouterModule to configure routes that determine which component should be displayed based on
 * the current browser URL. The routing setup supports navigation between different components
 * of the application, including a dashboard with nested routes, and a login component.
 *
 * The module leverages route guards to protect certain routes, ensuring that they can only be
 * accessed by authenticated users. This is achieved through the use of the AuthGuard service.
 *
 * Routes Configuration:
 * - `/dashboard`: The main entry point of the application for authenticated users. It renders
 *   the DashboardComponent and includes child routes for creating videos and viewing past uploads.
 *   This route is protected by the AuthGuard to ensure only authenticated users can access it.
 * - `/dashboard/create-video`: A child route under `/dashboard` for uploading new videos. It
 *   renders the CreateVideoComponent.
 * - `/dashboard/past-uploads`: A child route under `/dashboard` that displays a list of past
 *   video uploads. It renders the PastUploadsComponent.
 * - `/login`: Route for the login page, allowing users to sign in. It renders the LoginComponent.
 * - Default routes: Redirects to `/dashboard` as the default route when no specific path is matched.
 *
 * Usage:
 * To use this routing module, import it into your main application module (app.module.ts) using
 * the `imports` array. Angular's RouterModule.forRoot() method is called with the `routes` array
 * to configure the router at the application's root level.
 *
 * Example (app.module.ts):
 *
 * ```typescript
 * import { AppRoutingModule } from './app-routing.module';
 * // Other imports...
 *
 * @NgModule({
 *   imports: [
 *     // Other modules...
 *     AppRoutingModule, // Import the AppRoutingModule
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * This module centralizes the routing configuration for the application, making it easier to manage
 * navigation and route protection based on authentication status.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVideoComponent } from './CreateVideo/CreateVideo.component';
import { PastUploadsComponent } from './past-uploads/past-uploads.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'create-video', component: CreateVideoComponent },
      { path: 'past-uploads', component: PastUploadsComponent },
      { path: '', redirectTo: 'create-video', pathMatch: 'full' }, // Default route under dashboard
    ],
    canActivate: [AuthGuard], // Protects the dashboard and its child routes
  },
  { path: 'login', component: LoginComponent }, // Route for the login page
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirects to the dashboard as the default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
