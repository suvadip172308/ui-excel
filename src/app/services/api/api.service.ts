import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';

import { BASE_URL } from '../../shared/config/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {};

  public postCall(url, payload) {
    const fullUrl = this.getUrl(url);

    return this.http.post(fullUrl, payload, { observe: 'response' });
  }

  private getUrl(url: string) {
    return `${BASE_URL}${url}`;
  }
}
