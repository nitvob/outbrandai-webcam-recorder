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

  async toggleRecording() {
    if (this.isRecording) {
      // Stop recording
      this.mediaRecorder?.stop();
      this.isRecording = false;
      this.showPreview = false;
    } else {
      // Start recording
      this.recordedChunks = [];
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 360 }, // Specify desired resolution
          audio: true,
        });

        // Check if previewElement is defined before accessing its nativeElement
        if (this.previewElement && this.previewElement.nativeElement) {
          this.previewElement.nativeElement.srcObject = stream;
        }
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };
        this.mediaRecorder.onstop = () => {
          const videoBlob = new Blob(this.recordedChunks, {
            type: 'video/webm',
          });
          this.videoSrc = URL.createObjectURL(videoBlob);
          this.cdr.detectChanges();
          stream.getTracks().forEach((track) => track.stop()); // Stop the camera stream

          // After setting the video source:
          const videoPlaybackElement = this.previewElement?.nativeElement;
          if (videoPlaybackElement) {
            videoPlaybackElement.load(); // Load the new video source
            videoPlaybackElement
              .play()
              .catch((error) => console.error('Video playback failed', error));
          }
        };
        this.mediaRecorder.start();
        this.isRecording = true;
        this.showPreview = true;
      } catch (err) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not access media devices.',
          life: 3000,
        });
      }
    }
  }

  redoRecording() {
    this.videoSrc = null;
    this.showPreview = true;
    this.isRecording = false;
  }

  uploadVideo() {
    if (this.isUploading || this.recordedChunks.length === 0) {
      return;
    }
    this.isUploading = true;
    const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
    this.apiService.uploadVideo(videoBlob).subscribe({
      next: (response) => {
        this.isUploading = false;
        this.displayNotification(
          'Success',
          'Video successfully uploaded',
          'success'
        );
        setTimeout(() => {
          this.router.navigate(['/dashboard/past-uploads']);
        }, 1500);
      },
      error: (error) => {
        console.error('Upload Error:', error);
        this.displayNotification('Error', error.error.message, 'error');
        this.isUploading = false;
      },
    });
  }

  displayNotification(summary: string, detail: string, severity: string) {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}
