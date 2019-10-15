import { Injectable } from '@angular/core';

import { BASE_URL } from '../shared/config/config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public postCall(url, payload) {
    console.log('Service...');
  }
}
