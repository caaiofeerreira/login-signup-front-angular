import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  apiURL: string = "http://localhost:8080"

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiURL+"/login", {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("email", email)
        sessionStorage.setItem("auth-token", value.token)
      })
    )
  }

  signup(name: string, email: string, password: string, passwordConfirm: string) {

    return this.httpClient.post<LoginResponse>(this.apiURL+"/register", {name, email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("email", email)
        sessionStorage.setItem("auth-token", value.token)
      })
    )
  }
}