import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/conta/login`;
    const body = { email, senha: password };

    return this.http.post(url, body);
  }
}

function logout() {
  localStorage.removeItem('token')
}

function getToken() {
  return localStorage.getItem('token')
}

function isAuteh(): boolean {
  if (getToken() !== null) {
    return true;
  } else {
    return false;
  }
}


