import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import jwt_decode from 'jwt-decode'
import { FormBuilder } from '@angular/forms';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  user!:User
  questionObserver:any

  questionForm = this.fb.group({
    question: [''],
    image: [''],
    subject: [''],
    rewardPoints: ['']
  })


  constructor(
    private cookieService:CookieService,
    private router:Router,
    private fb:FormBuilder,
    private questionService:QuestionService
  ) { }

  ngOnInit(): void {
    if(this.isUserLoggedIn()){
      this.user = this.getDecodedAccessToken(this.cookieService.get('Token'))?.user;
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
    this.questionObserver = this.questionService.postQuestion({data: this.questionForm.value})
    .subscribe((res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    })
  }

}
