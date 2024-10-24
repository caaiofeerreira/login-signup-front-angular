import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signForm!: FormGroup<SignupForm>;

  constructor(private router: Router, private loginService: LoginService, private toastService: ToastrService) {
    this.signForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    const { name, email, password, passwordConfirm } = this.signForm.value;

    if (password !== passwordConfirm) {
      this.toastService.error('As senhas não coincidem.')
      return;
    }

    this.loginService.signup(name, email, password, passwordConfirm).subscribe({
      next: () => {
        this.toastService.success("Cadastro feito com sucesso!"),
        this.router.navigate(['/authenticated-user']);
      },
      error: (err) => {
        if (err.status === 409) {
          const errorMessage = err.error?.message || "Este e-mail já está cadastrado.";
          this.toastService.error(errorMessage);
        } else {
          this.toastService.error("Erro inesperado! Tente novamente mais tarde.");
        }
      }
    });
  }

  navigate() {
    this.router.navigate(["/login"])
  }
}