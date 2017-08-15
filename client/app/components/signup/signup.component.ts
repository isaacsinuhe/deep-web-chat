import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service'
import { FormBuilder, Validators } from '@angular/forms'
import { MdSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { equalValidator } from '../../validators/formValidators'

@Component({
  selector: 'deep-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username
  password
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
      username: ['', Validators.required]
      , password: this.fb.group({
          pass: ['', [Validators.required, Validators.minLength(8)]],
          pass2: ['', [Validators.required, Validators.minLength(8)]]
      }, { validator: equalValidator })
      , name: ['', Validators.required]
      , email: ['', [Validators.required, Validators.email]]
    })
  }

  signUp() {
    const { controls: {
        username: { value: username },
        password: { value: password }
      } } = this.signUpForm

    this.signUpService.requestSignUp({ username, password })
      .subscribe(
      v => {
        this.validateForm()
      },
      console.error
    )
  }

  validateForm() {
    this.signUpForm.updateValueAndValidity()
    if (this.signUpForm.valid) {
      // this.snackBar.open('accepted', 'x', { duration: 700 })
      this.router.navigate(['/dashboard'])
    } else {
      // this.snackBar.open('rejected', 'x', { duration: 700 })
    }
  }
}
