import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, merge, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private storage: any = localStorage.getItem('user');
  akses = JSON.parse(this.storage);

  constructor(private http: HttpClient) {}

  getData(data: string): Observable<any> {
    return this.http.get<any>(env.api + data).pipe((res) => res);
  }

  updateData(table: string, data: string, id: any) {
    return this.http.put<any>(env.api + table + id, data).pipe((res) => res);
  }

  deleteData(data: any) {
    return this.http.delete<any>(env.api + data);
  }

  postData(table: string, data: any) {
    return this.http.post<any>(env.api + table, data).pipe((res) => res);
  }
}
