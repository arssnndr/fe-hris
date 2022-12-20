import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public throwCatchData: any;
  constructor(private http: HttpClient) {}

  throwData(data: any) {
    this.throwCatchData = data;
  }

  catchData() {
    return this.throwCatchData;
  }

  getData(data: string): Observable<any> {
    return this.http.get<any>(env.api + data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateData(table: string, data: string, id: any) {
    return this.http.put<any>(env.api + table + id, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteData(data: any) {
    return this.http.delete<any>(env.api + data);
  }

  postData(table: string, data: any) {
    return this.http.post<any>(env.api + table, data).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
