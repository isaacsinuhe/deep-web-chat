import { Component, OnInit, DoCheck } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service'
import { FormBuilder, Validators } from '@angular/forms'
import { MdSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { equalValidator } from '../../validators/formValidators'

import { User } from '../../interfaces/user'

@Component({
  selector: 'deep-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm
  passMinLength = {length: 8}

  constructor(
    private signUpService: SignUpService,
    private fb: FormBuilder,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['',
        Validators.required,
        this.signUpService.isUsernameUnique.bind(this.signUpService)],
      password: this.fb.group({
          pass: ['', [Validators.required, Validators.minLength(8)]],
          pass2: ['', [Validators.required, Validators.minLength(8)]]
      }, { validator: equalValidator }),
      fullname: ['', Validators.required],
      email: ['', 
        [Validators.required, Validators.email],
        this.signUpService.isEmailUnique.bind(this.signUpService)
      ]
    })
  }

  signUp() {
    
    const { controls: {
      username: { value: username },
      fullname: { value: fullname },
      email: { value: email },
      password: {controls: { pass: {value: password} }}
    } } = this.signUpForm
    
    const user = new User({ username, fullname, email, password })
    this.signUpForm.updateValueAndValidity()

    if (this.signUpForm.valid) {
      this.signUpService
        .requestSignUp(user)
        .subscribe(
          v => {
            localStorage.removeItem('id_token')
            localStorage.setItem('id_token', v.id_token)
            this.router.navigate(['/dashboard'])
          },
          e => {
            localStorage.removeItem('id_token')
            this.snackBar.open('There has been an error with the server, try again later', 'x', { duration: 700 })
          }
      )
    }
  }
}
