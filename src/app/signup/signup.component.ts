import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import {getFormValidationErrors} from '../utils/utils'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessages:string[] = []

  signupForm:FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
    email: ['', [Validators.required, Validators.email]],
    profilePicture: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
    birthday: ['',[Validators.required]],
    level: ['',[Validators.required]]
  })

  constructor(
    private fb:FormBuilder,
    private userService: UserService,
    private router:Router,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    // clear errors first
    this.errorMessages = getFormValidationErrors(this.signupForm)

    if(!this.errorMessages[0]){
      console.log(this.signupForm.controls);
      console.log({data: this.signupForm.value});
      this.userService.signupUser({data: this.signupForm.value}).subscribe((userResponse) => {
        this.cookieService.put('Token', userResponse.data.token)
        this.cookieService.put('User', JSON.stringify(userResponse.data.user))
        this.router.navigate(['/dashboard'])
  
      },
      (err) => {
        console.log(err);
        this.errorMessages.push(err.error.error.message)
      })
    }
    
  }

}
