import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private httpClient: HttpClient
  ) {} // Inject the Router

  logout(): void {
    this.authService.signOut();

    // Redirect to login or home
    this.router.navigate(['/login']); // Update '/login' to your actual login or home route
  }
}
