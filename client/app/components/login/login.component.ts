import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { FormBuilder, Validators } from '@angular/forms'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'
import { Router } from '@angular/router'
import { Credentials } from '../../models/user'
import { JwtHelper, tokenNotExpired } from 'angular2-jwt'


@Component({
  selector: 'deep-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm
  passMinLength = { length: 8 }
  private helper = new JwtHelper
 
  constructor(
    private snackBar: MdSnackBar,
    private loginService: LoginService, 
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required]
      , password: ['', Validators.required]
    })
  }

  logIn () {
    const { controls: {
        username: {value: username},
        password: {value: password}
      }} = this.loginForm
    
    const credentials = new Credentials({ username, password})
    this.loginForm.updateValueAndValidity()

    if (this.loginForm.valid) {
      this.loginService
        .requestLogin(credentials)
        .subscribe(
          v => {
            localStorage.setItem('id_token', v.id_token)
            this.router.navigate(['/dashboard'])
          },
          e => {
            // localStorage.removeItem('id_token')
            this.snackBar.open('The username or the password you typed are incorrect, try again', 'x', { duration: 2000 })
          }
        )
    }
  }
}
