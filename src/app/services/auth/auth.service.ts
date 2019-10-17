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
}
