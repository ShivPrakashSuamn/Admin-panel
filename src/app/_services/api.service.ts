import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  get(url: string, options: any) {
    return this.http.get(this.BASE_URL + url, options);
  }

  post(url: string, formData: any, options: any) {
    return this.http.post(this.BASE_URL + url, formData, options);
  }
  
}
