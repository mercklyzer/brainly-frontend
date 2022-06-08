import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Event, Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import { environment } from "src/environments/environment";
import { UserService } from "../services/user.service";
import { getFormValidationErrors } from "../utils/utils";

@Component({
    selector: 'signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.css']
})
export class SignupPage {
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
  
    updateImage(files:FileList | null){
        if(files && files.length > 0){
            const file = files[0] as File
            this.image = file
            this.signupForm.patchValue({profilePicture: `${this.url}/images/${this.image.name}`})
        }
    }
  
    submitForm(){
      this.errorMessages = getFormValidationErrors(this.signupForm)
              
      if(!this.errorMessages[0]){
  
        this.userService.signupUser({data: this.signupForm.value}).subscribe((userResponse) => {
          this.cookieService.put('Token', userResponse.data.token)
          this.cookieService.put('User', JSON.stringify(userResponse.data.user))
          if(userResponse.data.user.profilePicture !== ''){
  
            let blob = this.image.slice(0, this.image.size, this.image.type); 
            let newFile = new File([blob], `${userResponse.data.user.userId}-${this.image.name}`, {type: this.image.type});
  
            const fd = new FormData()
            fd.append('file',newFile)
  
            this.userService.uploadImage(fd)
            .subscribe((res) => {
              if(res.data === 'uploaded'){
                this.router.navigate(['/dashboard'])
              }
            },
            (err) => {
              console.log(err);
            })
  
          }
          else{
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