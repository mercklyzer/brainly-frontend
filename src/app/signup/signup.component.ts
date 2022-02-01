import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import {getFormValidationErrors} from '../utils/utils'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessages:string[] = []

  url:string = environment.apiUrl

  image:any

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

  selectImage(event:any){
    if(event.target.files.length > 0){
      const file = <File>event.target.files[0]
      this.image = file
      console.log("image name");
      console.log(this.image.name);
      this.signupForm.patchValue({profilePicture: this.image.name})
    }
  }

  onSubmit(){
    this.errorMessages = getFormValidationErrors(this.signupForm)
    
    this.signupForm.patchValue({
      profilePicture: this.signupForm.get('profilePicture')?.value?
      `${this.url}/images/${this.signupForm.get('profilePicture')?.value}`
      :
      ''
    })

    console.log(this.signupForm.value);
    
    if(!this.errorMessages[0]){

      this.userService.signupUser({data: this.signupForm.value}).subscribe((userResponse) => {
        if(userResponse.data.user.profilePicture !== ''){
          console.log(userResponse.data);
          console.log("object");

          let blob = this.image.slice(0, this.image.size, this.image.type); 
          let newFile = new File([blob], `${userResponse.data.user.userId}-${this.image.name}`, {type: this.image.type});

          const fd = new FormData()
          fd.append('file',newFile)

          this.userService.uploadImage(fd)
          .subscribe((res) => {
            console.log(res);
            console.log("after res");
            this.cookieService.put('Token', userResponse.data.token)
            this.cookieService.put('User', JSON.stringify(userResponse.data.user))
            this.router.navigate(['/dashboard'])
          },
          (err) => {
            console.log(err);
          })

        }
        else{
          this.cookieService.put('Token', userResponse.data.token)
          this.cookieService.put('User', JSON.stringify(userResponse.data.user))
          this.router.navigate(['/dashboard'])
        }
  
      },
      (err) => {
        console.log(err);
        this.errorMessages.push(err.error.error.message)
      })
    }
    
  }

}
