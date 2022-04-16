import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  baseUrl: string | undefined
  staffSingle: Event | undefined;
  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl
  }

  childrenList() {
    let url = this.baseUrl + 'staff-children';
    return this.http.get(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
      observe: 'response'
    })
  }
  
}
