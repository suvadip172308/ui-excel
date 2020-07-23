import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

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

  removeToken() {
    return localStorage.removeItem('authorization');
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

  removeLocalStore(prop: string) {
    return localStorage.removeItem(prop);
  }

  isAdmin() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const tokenInfo = jwt_decode(token);
      return tokenInfo.isAdmin;
    } catch (err) {
      return null;
    }
  }
}
