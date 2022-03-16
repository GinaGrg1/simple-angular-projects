import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { MediaItemResponse } from './media-items';

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {

  constructor(private http: HttpClient) { }

  get(medium) {
    const getOptions = {
      params: { medium } // defined in mock-xhr-backend.ts
    };
    return this.http.get<MediaItemResponse>('mediaitems', getOptions)
    .pipe(
      map((response: MediaItemResponse) => {
        return response.mediaItems;
      }),
      catchError(this.handleError)
    );
  }

  add(mediaItem) {
   return this.http.post('mediaitems', mediaItem)
    .pipe(
      catchError(this.handleError)
      );
  };

  delete(mediaItem) {
    return this.http.delete(`mediaitems/${mediaItem.id}`)
      .pipe(
        catchError(this.handleError)
        );
  };

  private handleError(error: HttpErrorResponse) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent){
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message: ${error.message}}`
    }
    console.log(error);
    return throwError(() => errorMessage);
  }
}
