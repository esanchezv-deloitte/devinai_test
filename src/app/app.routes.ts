import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/others/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (mod) => mod.LoginComponent,
      ),
    title: 'Sign In',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (mod) => mod.RegisterComponent,
      ),
    title: 'Sign Up',
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/admin/admin.routes').then((mod) => mod.routes),
  },
  { path: '**', component: PageNotFoundComponent },
];
