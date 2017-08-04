import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service'
import { FormBuilder, Validators } from '@angular/forms'
import { MdSnackBar } from '@angular/material'
import { Router } from '@angular/router'

@Component({
  selector: 'deep-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username
  password
  signUpForm

  constructor(
    private signUpService: SignUpService,
    private fb: FormBuilder,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required]
      , password: ['', Validators.required]
      , name: ['', Validators.required]
      , email: ['', Validators.required]
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
    console.log(this.signUpForm, this.signUpForm.valid);
    
    if (this.signUpForm.valid) {
      this.snackBar.open('accepted', 'x', { duration: 700 })
      this.router.navigate(['/dashboard'])
    } else {
      this.snackBar.open('rejected', 'x', { duration: 700 })
    }
  }
}
