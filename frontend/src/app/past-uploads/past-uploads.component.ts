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
    // Fetch past uploads here. This is just a static example.
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
    this.currentVideoUrl = videoUrl; // Store the URL as a string
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
