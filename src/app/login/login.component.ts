import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { getFormValidationErrors } from '../utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isError:boolean = false
  errorMessages:string[] = []

  loginForm = this.fb.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required],
  })


  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router,
    private cookieService:CookieService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.errorMessages = getFormValidationErrors(this.loginForm)

    if(!this.errorMessages[0]){
      this.userService.loginUser({data: this.loginForm.value}).subscribe((userResponse) => {
        
        this.cookieService.put('Token', userResponse.data.token)
        this.cookieService.put('User', JSON.stringify(userResponse.data.user))

        this.router.navigate(['/dashboard'])
      },
      (err) => {
        this.errorMessages.push(err.error.error.message)
        console.log(err);
      })
    }
  }


 

}
