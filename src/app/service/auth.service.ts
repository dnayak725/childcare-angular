import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string | undefined
  registerForm: any;
  constructor(
    private http: HttpClient,
  ) {
    this.baseUrl = environment.apiUrl
  }

  login(data:any){
    let url = this.baseUrl + 'auth/login';
    return this.http.post(url, data)
  }
}
