import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

import { BASE_URL } from '../../shared/config/config';
import { QueryParams } from '../../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { };

  public getUrl(url: string, queryParams?: QueryParams[]) {
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

  public postCall(url, payload) {
    const fullUrl = this.getUrl(url);

    return this.http.post(fullUrl, payload, { observe: 'response' });
  }

  public getCall(url: string, queryParams?: QueryParams[]) {
    const fullUrl = this.getUrl(url, queryParams);

    return this.http.get(fullUrl);
  }

  public updateCall(url: string, id: string, payload) {
    const partialUrl = this.getUrl(url);
    const fullUrl = `${partialUrl}/${id}`;
    const data = _.pickBy(payload, _.identity);

    return this.http.put(fullUrl, data);
  }

  putCall(url, payload) {
    const fullUrl = this.getUrl(url);

    return this.http.put(fullUrl, payload, { observe: 'response' });
  }

  deleteCall(url, payload?: any) {
    const fullUrl = this.getUrl(url);
    if (payload) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body: payload
      }

      return this.http.delete(fullUrl, options);
    } else {
      return this.http.delete(fullUrl, { observe: 'response' });
    }
  }
}
