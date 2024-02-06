import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, switchMap, first } from 'rxjs';
import { AuthService } from '../auth.service';
import { filter, map } from 'rxjs/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getPastUploads(): Observable<any> {
    return from(this.authService.getIdToken()).pipe(
      switchMap((token) =>
        this.httpClient.get('api/past-uploads', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ),
      first()
    );
  }

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
