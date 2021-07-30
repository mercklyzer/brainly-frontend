import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import jwt_decode from 'jwt-decode'
import { FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';
import { getFormValidationErrors } from '../utils/utils';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  user!:User
  questionObserver:any

  errorMessages:string[] = []

  questionForm = this.fb.group({
    question: ['', Validators.required],
    image: [''],
    subject: ['filipino', Validators.required],
    rewardPoints: ['', Validators.required]
  })


  constructor(
    private cookieService:CookieService,
    private router:Router,
    private fb:FormBuilder,
    private questionService:QuestionService
  ) { }

  ngOnInit(): void {
    if(this.isUserLoggedIn()){
      this.user = JSON.parse(this.cookieService.get('User'));
    }
    else{
      this.router.navigate(['/']);
    }
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      console.log(Error);
      return null;
    }
  }

  isUserLoggedIn():boolean{
    return this.cookieService.get('Token') !== undefined
  }

  onSubmit(){
    this.errorMessages = getFormValidationErrors(this.questionForm)

    if(!this.errorMessages[0]){
      this.questionObserver = this.questionService.postQuestion({data: this.questionForm.value})
      .subscribe((res) => { 

        this.updateUserCurrentPtsCookie(this.questionForm.value.rewardPoints)
        this.router.navigate(['/question',res.data.questionId]);
        
      },
      (err) => {
        console.log(err);
        this.errorMessages.push(err.error.error.message)
      })
    }


  }

  updateUserCurrentPtsCookie(rewardPoints:number):void{
    let user = JSON.parse(this.cookieService.get('User'))
    user.currentPoints -= rewardPoints
    console.log(user);
    this.cookieService.put('User', JSON.stringify(user))
  }

}
