import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVideoComponent } from './CreateVideo/CreateVideo.component';
import { PastUploadsComponent } from './past-uploads/past-uploads.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Make sure to import the DashboardComponent
import { AuthGuard } from './auth.guard';
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
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
