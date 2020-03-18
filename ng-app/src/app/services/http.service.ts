import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, ) { }

  toggleGarageDoor(): Observable<any> {
    return this.http.post<any>('/api/toggle-garage-door', null);
  }
}
