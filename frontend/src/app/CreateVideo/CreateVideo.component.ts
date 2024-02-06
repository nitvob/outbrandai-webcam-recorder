/**
 * CreateVideoComponent
 *
 * This component is designed to handle video recording, preview, and upload functionalities within
 * the Angular application. It integrates with the browser's MediaDevices API to capture video,
 * utilizes the application's ApiService for uploading the recorded video to a backend server, and
 * leverages PrimeNG's MessageService for user notifications. The component manages the recording
 * state, previews the recorded video, and handles the upload process.
 *
 * Dependencies:
 * - ElementRef, ViewChild: Used to reference the video element in the template for preview and recording.
 * - ChangeDetectorRef: Facilitates manual detection of changes to update the view with dynamic content.
 * - Router: Enables programmatic navigation within the application, particularly after a video upload.
 * - MessageService (PrimeNG): Provides a mechanism to display messages and notifications to the user.
 * - ApiService: Custom service for communicating with the backend API, specifically for uploading videos.
 *
 * Properties:
 * - isRecording: Boolean flag indicating if recording is in progress.
 * - isUploading: Boolean flag indicating if an upload operation is in progress.
 * - showPreview: Boolean flag to control the visibility of the video preview.
 * - videoSrc: Holds the URL of the recorded video for preview purposes.
 * - mediaRecorder: Instance of MediaRecorder used for video capturing.
 * - recordedChunks: Array to accumulate chunks of video data during recording.
 * - previewElement: Reference to the video element in the template for preview and recording.
 *
 * Methods:
 * - toggleRecording(): Toggles the video recording state between start and stop.
 * - redoRecording(): Resets the component state to allow a new recording to be started.
 * - uploadVideo(): Initiates the video upload process to the backend API.
 * - displayNotification(): Utilizes MessageService to display notifications to the user.
 *
 * Usage:
 * The component is intended to be used as part of an authenticated user's interface, allowing them
 * to record and upload videos. It should be placed within a route that is protected by authentication
 * guards to ensure only authenticated users can access this functionality.
 *
 * Example:
 * <app-CreateVideo></app-CreateVideo>
 *
 * This tag would be used in an Angular template to render the video recording and upload interface,
 * assuming the user is authenticated and authorized to access this feature.
 */
import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-CreateVideo',
  templateUrl: './CreateVideo.component.html',
  styleUrls: ['./CreateVideo.component.scss'],
  providers: [MessageService],
})
export class CreateVideoComponent {
  // Component properties are initialized here.
  isRecording = false;
  isUploading = false;
  showPreview = true;
  videoSrc: string | null = null;
  mediaRecorder: MediaRecorder | null = null;
  recordedChunks: BlobPart[] = [];

  @ViewChild('preview') previewElement:
    | ElementRef<HTMLVideoElement>
    | undefined;

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private apiService: ApiService
  ) {}

  /**
   * Toggles the recording state of the application. If recording is currently not in progress,
   * it starts capturing video from the user's media devices. If recording is already happening,
   * it stops the recording and prepares the recorded video for preview.
   */
  async toggleRecording() {
    if (this.isRecording) {
      // Stop recording and prepare the video for preview
      this.mediaRecorder?.stop(); // Safely call stop() if mediaRecorder is not null
      this.isRecording = false;
      this.showPreview = false; // Hide the preview while stopping the recording
    } else {
      // Initialize recording
      this.recordedChunks = []; // Clear previously recorded chunks if any
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 360 }, // Request specific video resolution
          audio: true, // Include audio in the recording
        });

        if (this.previewElement && this.previewElement.nativeElement) {
          this.previewElement.nativeElement.srcObject = stream; // Show live video feed in preview
        }

        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data); // Accumulate recorded video data
          }
        };

        this.mediaRecorder.onstop = async () => {
          const videoBlob = new Blob(this.recordedChunks, {
            type: 'video/webm', // Specify the video format
          });
          this.videoSrc = URL.createObjectURL(videoBlob); // Create a URL for the recorded video
          this.cdr.detectChanges(); // Manually trigger change detection to update the view
          stream.getTracks().forEach((track) => track.stop()); // Stop all media tracks
        };

        this.mediaRecorder.start(); // Start recording
        this.isRecording = true;
        this.showPreview = true; // Enable video preview
      } catch (err) {
        // Handle errors such as no media devices available
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not access media devices.',
          life: 3000,
        });
      }
    }
  }

  /**
   * Resets the component state to allow starting a new recording. Clears the video source and
   * resets flags controlling the UI state.
   */
  redoRecording() {
    this.videoSrc = null; // Clear the current video source
    this.showPreview = true; // Show the preview for a new recording
    this.isRecording = false; // Ensure recording state is reset
  }

  /**
   * Initiates the upload of the recorded video to the backend server. It first checks if an upload
   * is already in progress or if there are no recorded chunks, in which case it does nothing. It then
   * sends the recorded video to the server via the ApiService and handles the response.
   */
  uploadVideo() {
    if (this.isUploading || this.recordedChunks.length === 0) {
      // Prevent duplicate uploads or uploading when there's no video
      return;
    }

    this.isUploading = true; // Indicate that an upload is in progress
    const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
    this.apiService.uploadVideo(videoBlob).subscribe({
      next: (response) => {
        // Handle successful upload
        this.isUploading = false;
        this.displayNotification(
          'Success',
          'Video successfully uploaded',
          'success'
        );
        setTimeout(() => {
          this.router.navigate(['/dashboard/past-uploads']); // Navigate to the past uploads page
        }, 1500); // Delay to allow the user to see the success message
      },
      error: (error) => {
        // Handle upload error
        this.isUploading = false;
        this.displayNotification('Error', error.error.message, 'error');
      },
    });
  }

  /**
   * Displays a notification message using the MessageService from PrimeNG.
   *
   * @param {string} summary - A brief summary of the notification.
   * @param {string} detail - Detailed text for the notification.
   * @param {string} severity - The severity level ('success', 'info', 'warn', 'error').
   */
  displayNotification(summary: string, detail: string, severity: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}
