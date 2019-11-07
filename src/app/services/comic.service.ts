import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const COMIC_API = `${environment.API_END_POINT}`;

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private readonly http: HttpClient) { }

  public getComicList(): Observable<any> {
    const url = `${COMIC_API}/index.json`;
    return this.http.get<any>(url)
      .pipe(map(resp => {
        if (resp) {
          return resp;
        }
      }), catchError(error => {
        return observableThrowError(error);
    }));
  }

  public getComicChapters(comicName): Observable<any> {
    let url = null;
    if (comicName.indexof('chapter') !== -1) {
      url = `${COMIC_API}${comicName}.json`;
    } else {
      url = `${COMIC_API}${comicName}/index.json`;
    }
    return this.http.get<any>(url)
      .pipe(map(resp => {
        if (resp) {
          return resp;
        }
      }), catchError(error => {
        return observableThrowError(error);
    }));
  }
}
