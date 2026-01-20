import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

interface DemoUser {
  username: string;
  code: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  validateCredentials(username: string, password: string): Observable<any> {
    const demoUsers = environment.demoUsers as DemoUser[];
    const user = demoUsers.find(
      (u: DemoUser) => u.username === username && u.code === password
    );

    if (user) {
      return of({
        token: this.generateToken(),
        username: user.username,
        name: user.name,
        email: user.email
      });
    }

    return of(null);
  }

  private generateToken(): string {
    return 'token_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}
