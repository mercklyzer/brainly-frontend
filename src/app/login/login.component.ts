import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

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
    this.isError = false
    this.errorMessages = []
    console.log(this.loginForm.value);

    if(!this.getFormValidationErrors()){
      this.userService.loginUser({data: this.loginForm.value}).subscribe((userResponse) => {
        this.cookieService.put('Token', userResponse.data.token)
        this.router.navigate(['/dashboard'])
      },
      (err) => {
        this.isError = true
        this.errorMessages.push(err.error.error.message)
        console.log(err);
      })
    }

  }

  getFormValidationErrors() {
    let hasError = false
    Object.keys(this.loginForm.controls).forEach(key => {
      let controlErrors: any = this.loginForm.get(key)?.errors;
      
      if (controlErrors != null) {
        hasError = true
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ' + controlErrors[keyError]);
          this.isError = true

          let field = this.getKeyString(key)
          let errorMessage = this.getErrorMessage(keyError)


          this.errorMessages.push(field + ' ' + errorMessage)
          console.log(this.errorMessages);
        });
      }
    });

    return hasError
  }


  getKeyString(key:string):string{
    if(key === 'usernameOrEmail') return 'Username or email'
    if(key === 'password')        return 'Password'
    return ''
  }
  
  getErrorMessage(keyError:string):string{
    if(keyError === 'required')   return 'is required.'
    return ''
  }
 

}
