import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';
import { getFormValidationErrors, updateUserCurrentPtsCookie } from '../utils/utils';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @ViewChild('rewardPointsInput') rewardPointsInput!:ElementRef

  user!:User
  questionObserver:any

  errorMessages:string[] = []

  questionForm:FormGroup = this.fb.group({
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

  isUserLoggedIn():boolean{
    return this.cookieService.get('Token') !== undefined
  }

  onSubmit(){
    this.errorMessages = getFormValidationErrors(this.questionForm)

    if(!this.errorMessages[0]){
      this.questionObserver = this.questionService.postQuestion({data: this.questionForm.value})
      .subscribe((res) => { 

        updateUserCurrentPtsCookie(this.cookieService, -this.questionForm.value.rewardPoints)
        this.router.navigate(['/question',res.data.questionId]);
        
      },
      (err) => {
        console.log(err);
        this.errorMessages.push(err.error.error.message)
      })
    }
  }

  verifyRewardPoints(){
    const maxRewardPoints = this.user.currentPoints

    if(this.rewardPointsInput.nativeElement.value > maxRewardPoints){
      console.log(maxRewardPoints);
      this.rewardPointsInput.nativeElement.value = maxRewardPoints
    }
    console.log("blur");
  }

}
