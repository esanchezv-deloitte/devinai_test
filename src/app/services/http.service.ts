import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class HttpService {
  private apiUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getUserList(): Observable<any> {
    const url = `${this.apiUrl}/users`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        // Handle errors here (e.g., log them, display an error message)
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to propagate it to the subscriber
      }),
    );
  }

  login(loginData: any): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    return this.http.post<any>(url, loginData).pipe(
      catchError((error) => {
        // Handle errors here (e.g., log them, display an error message)
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to propagate it to the subscriber
      }),
    );
  }
}
