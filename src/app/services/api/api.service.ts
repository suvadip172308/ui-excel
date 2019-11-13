import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';

import { BASE_URL } from '../../shared/config/config';
import { QueryParams } from '../../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {};

  public postCall(url, payload) {
    const fullUrl = this.getUrl(url);

    return this.http.post(fullUrl, payload, { observe: 'response' });
  }

  public getCall(url: string, queryParams?: QueryParams[]) {
    const fullUrl = this.getUrl(url, queryParams);

    return this.http.get(fullUrl);
  }

  private getUrl(url: string, queryParams?: QueryParams[]) {
    let query = '';
    
    if (queryParams) {
      query = query + '?';
      
      queryParams.forEach(param => {
        query = `${query}${param.key}=${param.value}&`;
      });

      query = query.slice(0, -1);
    }
    
    return `${BASE_URL}${url}${query}`;
  }
}
