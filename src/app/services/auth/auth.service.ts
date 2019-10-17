import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken() {
    return localStorage.getItem('authorization') || null;
  }

  setToken(token: string) {
    localStorage.setItem('authorization', token || '');
  }

  isTokenAvailable() {
    return !!this.getToken();
  }

  setLocalStore(prop: string, data: string) {
    localStorage.setItem(prop, data);
  }

  getLocalStore(prop: string) {
    return localStorage.getItem(prop);
  }
}
