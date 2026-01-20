import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-admin',
    imports: [RouterOutlet, RouterLink, MatSidenavModule, MatListModule],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(private _authService: AuthService) {}

  public logout() {
    this._authService.logout();
  }
}
