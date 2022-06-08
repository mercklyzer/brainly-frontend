import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { Subscription } from "rxjs";
import { UserService } from "../services/user.service";
import { getFormValidationErrors } from "../utils/utils";

@Component({
    selector: 'login',
    templateUrl: './login.page.html',
    styles: [
        `.my-form{
            border: 2px solid #EBF2F7;
            border-radius: 10px;
            padding: 20px;
        }
        
        .login-section{
            padding-top: 80px;
        }`
    ]
})
export class LoginPage{
    isError:boolean = false
    errorMessages:string[] = []
  
    loginForm:FormGroup = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
    })
  
    private subscriptions = new Subscription()
  
    constructor(
      private fb:FormBuilder,
      private userService:UserService,
      private router:Router,
      private cookieService:CookieService,
    ) { }
  
    ngOnInit(): void {
    }
  
    ngOnDestroy(): void {
      this.subscriptions.unsubscribe()
    }
  
    submitForm(){
      this.errorMessages = getFormValidationErrors(this.loginForm)
  
      if(!this.errorMessages[0]){
        this.subscriptions.add(this.userService.loginUser({data: this.loginForm.value}).subscribe((userResponse) => {
          
          this.cookieService.put('Token', userResponse.data.token)
          this.cookieService.put('User', JSON.stringify(userResponse.data.user))
  
          this.router.navigate(['/dashboard'])
        },
        (err) => {
          this.errorMessages.push(err.error.error.message)
          console.log(err);
        }))
      }
    }
}