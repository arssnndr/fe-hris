import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(data: string): Observable<any> {
    return this.http.get<any>(env.api + data).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
