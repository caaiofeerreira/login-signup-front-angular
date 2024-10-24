import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthenticatedUserComponent } from './pages/authenticated-user/authenticated-user.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "authenticated-user",
    component: AuthenticatedUserComponent,
    canActivate: [AuthGuard]
  }
];