import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { FormBuilder, Validators } from '@angular/forms'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'
import { Router } from '@angular/router'

@Component({
  selector: 'deep-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username
  password
  loginForm
 
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
    
    console.log(username, password)
    
    this.loginService
      .requestLogin({username, password})
      .subscribe(
        v => { this.validateForm() },
        console.error
      )
  }
  
  validateForm () {

    if (this.loginForm.valid) {
      // this.snackBar.open('accepted', 'x', { duration: 700 })
      this.router.navigate(['/dashboard'])
    } else {
      // this.snackBar.open('rejected', 'x', { duration: 700 })
    }
  }
}
