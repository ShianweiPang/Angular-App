import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();
  constructor(private http: HttpClient) {
    this.loadToken(); // Load token when service is created
  }

  /** Call /api/token and store it */
  fetchToken() {
    this.http.get<{ accessToken: string }>('/api/token').subscribe((res) => {
      this.setToken(res.accessToken);
    });
  }

  /** Store token in sessionStorage and BehaviorSubject */
  private setToken(token: string) {
    sessionStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  /** Load token from sessionStorage on app reload */
  private loadToken() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  /** Get current token */
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}
