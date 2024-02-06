/**
 * past-uploads.component.ts
 *
 * This Angular component is responsible for displaying a list of past video uploads by the
 * authenticated user. It interacts with the ApiService to fetch the list of uploads and displays
 * them. It also handles the logic for opening and closing a modal to show a selected video.
 * Additionally, it uses PrimeNG's MessageService to display notifications for errors or other
 * actions.
 *
 * Dependencies:
 * - @angular/core: Provides the Component decorator and OnInit lifecycle hook interface.
 * - ApiService: A custom service to interact with the backend API for fetching past uploads.
 * - MessageService from 'primeng/api': A service provided by PrimeNG for displaying messages and
 *   notifications within the application.
 *
 * Component Decorator:
 * - selector: 'app-past-uploads' - The selector used to include this component in a parent template.
 * - templateUrl: The path to the HTML template associated with this component.
 * - styleUrls: An array with paths to the stylesheets for this component.
 *
 * Properties:
 * - uploads: An array to store the list of past uploads fetched from the backend.
 * - showModal: A boolean to control the visibility of the modal for video playback.
 * - currentVideoUrl: A string to store the URL of the currently selected video for playback.
 *
 * Methods:
 * - ngOnInit(): Lifecycle hook that fetches the list of past uploads when the component is initialized.
 * - openModal(videoUrl: string): Opens the modal for video playback and sets the currentVideoUrl.
 * - closeModal(): Closes the modal and clears the currentVideoUrl.
 * - displayNotification(summary, detail, severity): Utilizes MessageService to display notifications.
 *
 * Usage:
 * To use this component, ensure it is declared in a module and included in the appropriate route
 * configurations if necessary. It can then be used in templates with its selector, 'app-past-uploads'.
 *
 * Example:
 *
 * ```html
 * <app-past-uploads></app-past-uploads>
 * ```
 *
 * This component enhances the user experience by allowing users to view and manage their past video
 * uploads, providing a user-friendly interface for interaction with the application's media content.
 */

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-past-uploads',
  templateUrl: './past-uploads.component.html',
  styleUrls: ['./past-uploads.component.scss'],
})
export class PastUploadsComponent implements OnInit {
  uploads: any[] = [];
  showModal: boolean = false;
  currentVideoUrl: string = '';

  constructor(
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.apiService.getPastUploads().subscribe(
      (data) => {
        this.uploads = data;
      },
      (error) => {
        console.error('Error fetching past uploads', error);
        this.displayNotification('Error', error.error.message, 'error');
      }
    );
  }

  openModal(videoUrl: string): void {
    this.currentVideoUrl = videoUrl;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentVideoUrl = '';
  }

  displayNotification(summary: string, detail: string, severity: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}
