/**
 * api.service.ts
 *
 * This Angular service abstracts the interactions with the backend API, providing methods
 * to fetch past video uploads and upload new videos. It leverages Angular's HttpClient for
 * making HTTP requests and integrates with AuthService to include authentication tokens in
 * requests. This ensures that API calls are authenticated and that users can only access their
 * data. The service uses RxJS operators to handle asynchronous token retrieval and request
 * chaining.
 *
 * Dependencies:
 * - @angular/core: Provides the Injectable decorator to define the service as a singleton
 *   that can be injected across the application.
 * - @angular/common/http: Used for making HTTP requests and handling responses.
 * - rxjs: Utilized for creating and manipulating observables, particularly for chaining asynchronous
 *   operations and filtering event streams.
 * - AuthService: A custom service that provides authentication functionalities, including token retrieval.
 *
 * Methods:
 * - getPastUploads(): Fetches a list of past video uploads for the authenticated user.
 * - uploadVideo(videoBlob: Blob): Uploads a new video file to the backend.
 *
 * Usage:
 * Inject ApiService into your components to interact with the backend API, handling video uploads
 * and retrieval within your application.
 *
 * Example (in a component):
 *
 * ```typescript
 * constructor(private apiService: ApiService) {}
 *
 * fetchUploads() {
 *   this.apiService.getPastUploads().subscribe(uploads => {
 *     console.log(uploads);
 *   });
 * }
 *
 * uploadVideo(file: Blob) {
 *   this.apiService.uploadVideo(file).subscribe(response => {
 *     console.log('Upload successful', response);
 *   });
 * }
 * ```
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, from, switchMap, first } from 'rxjs';
import { AuthService } from './auth.service';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Fetches a list of past uploads for the authenticated user.
   *
   * @returns An Observable of the past uploads data.
   */
  getPastUploads(): Observable<any> {
    return from(this.authService.getIdToken()).pipe(
      switchMap((token) =>
        this.httpClient.get('api/past-uploads', {
          headers: { Authorization: `Bearer ${token}` },
        })
      ),
      first() // Ensures the observable completes after the first value.
    );
  }

  /**
   * Uploads a video file to the server.
   *
   * @param videoBlob The video file as a Blob to be uploaded.
   * @returns An Observable of the HTTP response.
   */
  uploadVideo(videoBlob: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('video', videoBlob);

    return from(this.authService.getIdToken()).pipe(
      switchMap((token) =>
        this.httpClient
          .post('api/upload', formData, {
            headers: { Authorization: `Bearer ${token}` },
            reportProgress: true,
            observe: 'events',
          })
          .pipe(
            filter((event) => event.type === HttpEventType.Response),
            map((event) => (event as HttpResponse<any>).body)
          )
      )
    );
  }
}
