import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from  '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from  'rxjs/operators';
import { SessionService } from './session.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private httpClient: HttpClient,
    private session: SessionService
  ) { }

  public upload(data, userId) {
    let uploadURL = `${API_URL}/avatar`;

    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.session.accessToken
      })
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}
