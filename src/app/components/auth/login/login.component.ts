import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CredentialsService } from '../../../services/credentials.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        CommonModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public passHide: boolean = true;
  public errorMessage: string = '';
  public form: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private _authService: AuthService,
    private _credentialsService: CredentialsService
  ) {}

  ngOnInit(): void {
    this._authService.checkLogin();
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage = '';
    const { username, password } = this.form.value;
    this._credentialsService
      .validateCredentials(username, password)
      .subscribe({
        next: (val) => {
          if (val) {
            this._authService.setLoginData(val);
          } else {
            this.errorMessage = 'Usuario o contraseña incorrectos';
          }
        },
      });
  }
}
