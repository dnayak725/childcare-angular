import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  baseUrl: string | undefined
  staffSingle: Event | undefined;
  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.apiUrl
  }

  createStaff(data: any) {
    let url = this.baseUrl + 'staff-';
    return this.http.post(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
      observe: 'response'
    })
  }
  staff(perPage: any, pageNo: any) {
    let url = this.baseUrl + 'staff?per_page=' + perPage + '&page_no=' + pageNo;
    return this.http.get(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
      observe: 'response'
    })
  }
  staffList(){
    let url = this.baseUrl + 'staff-';
    return this.http.get(url, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
      observe: 'response'
    })
  }
  updateStaff(data: any) {
    let url = this.baseUrl + 'staff-';
    return this.http.put(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
      observe: 'response'
    })
  }
  deleteStaff(data:any){
  let url = this.baseUrl + 'staff-delete';
    return this.http.post(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }),
      observe: 'response'
    })
  }
}
