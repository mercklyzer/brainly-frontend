import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isError:boolean = false
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
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    // clear errors first
    this.isError = false
    this.errorMessages = []

    if(!this.getFormValidationErrors()){
      console.log(this.signupForm.controls);
      console.log({data: this.signupForm.value});
      this.userService.signupUser({data: this.signupForm.value}).subscribe((res) => {
        this.router.navigate(['/']);
  
      },
      (err) => {
        console.log(err);
        this.isError = true
        this.errorMessages.push(err.error.error.message)
      })
    }
    
  }

  getFormValidationErrors() {
    let hasError = false
    Object.keys(this.signupForm.controls).forEach(key => {
      let controlErrors: any = this.signupForm.get(key)?.errors;
      
      if (controlErrors != null) {
        hasError = true
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ' + controlErrors[keyError]);
          this.isError = true

          let field = this.getKeyString(key)
          let errorMessage = this.getErrorMessage(key,keyError)


          this.errorMessages.push(field + ' ' + errorMessage)
          console.log(this.errorMessages);
        });
      }
    });
    
    return hasError
  }


  getKeyString(key:string):string{
    if(key === 'username')        return 'Username'
    if(key === 'email')           return 'Email'
    if(key === 'profilePicture')  return 'Profile picture'
    if(key === 'password')        return 'Password'
    if(key === 'birthday')        return 'Birthday'
    if(key === 'level')        return 'Level'
    return ''
  }
  
  getErrorMessage(key:string, keyError:string):string{
    if(keyError === 'required')   return 'is required.'
    if(keyError === 'minlength'){
      if(key === 'username'){
        return 'should be at least 6 characters.'
      }
      if(key === 'password'){
        return 'should be at least 8 characters.'
      }
    }
    if(keyError === 'maxlength'){
      if(key === 'username'){
        return 'should not exceed 16 characters.'
      }
    }
    if(keyError === 'email')    return 'has invalid format.'

    return ''
  }
 

}
