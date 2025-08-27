import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private storage: any = localStorage.getItem('user');
  akses = JSON.parse(this.storage);

  constructor(private http: HttpClient) {}

  getData<T = any>(path: string): Observable<T> {
    return this.http.get<T>(env.api + path).pipe(
      catchError((err) => {
        console.error('GET error:', err);
        return throwError(() => err);
      })
    );
  }

  updateData<T = any>(table: string, data: any, id: string | number): Observable<T> {
    return this.http.put<T>(env.api + table + id, data).pipe(
      catchError((err) => {
        console.error('PUT error:', err);
        return throwError(() => err);
      })
    );
  }

  deleteData<T = any>(path: string): Observable<T> {
    return this.http.delete<T>(env.api + path).pipe(
      catchError((err) => {
        console.error('DELETE error:', err);
        return throwError(() => err);
      })
    );
  }

  postData<T = any>(table: string, data: any): Observable<T> {
    return this.http.post<T>(env.api + table, data).pipe(
      catchError((err) => {
        console.error('POST error:', err);
        return throwError(() => err);
      })
    );
  }
}
