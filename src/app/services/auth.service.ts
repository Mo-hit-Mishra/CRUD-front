// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router'; // Import Router for navigation

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth1/'; // Update with your backend API URL
  private isAuthenticated: boolean = false;
  private redirectUrl: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  resetPassword(email: string): Observable<any> {
    // Make an HTTP POST request to your Node.js backend reset password route
    return this.http.post<any>(`${this.apiUrl}reset-password`, { email }).pipe(
      tap(response => {
        // Handle the response as needed
        console.log('Password reset initiated successfully. Check your email for instructions.');
      })
    );
  }
  handleResetPassword(resetObj: any): Observable<any> {
    // Make an HTTP POST request to your Node.js backend reset password route
    return this.http.post<any>(`${this.apiUrl}handle-reset-password`, resetObj ).pipe(
      tap(response => {
        // Handle the response as needed
        console.log('Password reset successfully');
      })
    );
  }


  authenticate(email: string, password: string): Observable<any> {
    // Make an HTTP POST request to your Node.js backend login route
    return this.http.post<any>(`${this.apiUrl}login`, { email, password }).pipe(
      tap(response => {
        // Handle the response, set isAuthenticated to true if login is successful
        if (response.token) {
          this.isAuthenticated = true;
        }
      })
    );
  }

  logout(): void {
    // Clear user-related information (e.g., token) and set isAuthenticated to false
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    
    // Additional cleanup if needed

    // Redirect to the login page or any other desired page after logout
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  clearRedirectUrl(): void {
    this.redirectUrl = null;
  }
  private checkToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const isValidToken = this.validateToken(token);

      if (isValidToken) {
        this.isAuthenticated = true;
      }
    }
  }

  private validateToken(token: string): boolean {
    try {
      // Split the token into its parts (header, payload, signature)
      const tokenParts = token.split('.');
      
      // Decode the payload (second part of the token)
      const decodedPayload = JSON.parse(atob(tokenParts[1]));
  
      // Check if the token is expired
      const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
      if (decodedPayload.exp && decodedPayload.exp < currentTimestamp) {
        // Token is expired
        return false;
      }
  
      // Additional custom checks based on your requirements
      // For example, you might check the user's role, issuer, or other claims
  
      return true; // Token is considered valid
  
    } catch (error) {
      console.error('Error validating token:', error);
      return false; // An error occurred while validating the token
    }
  }
  
}
