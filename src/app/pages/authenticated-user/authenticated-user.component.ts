import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authenticated-user',
  standalone: true,
  imports: [],
  templateUrl: './authenticated-user.component.html',
  styleUrl: './authenticated-user.component.scss'
})
export class AuthenticatedUserComponent {
  constructor(private router: Router, private toastService: ToastrService) {}

  logout() {
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("auth-token")

    setTimeout(() => {
      this.toastService.success("Desconectado com sucesso!")
      this.router.navigate(["/login"])
    }, 1000)
  }
}