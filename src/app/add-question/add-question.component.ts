import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { getFormValidationErrors, updateUserCurrentPtsCookie } from '../utils/utils';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  user!:User

  errorMessages:string[] = []

  questionForm:FormGroup = this.fb.group({
    question: ['', Validators.required],
    subject: ['filipino', Validators.required],
    rewardPoints: ['', Validators.required]
  })

  constructor(
    private cookieService:CookieService,
    private router:Router,
    private fb:FormBuilder,
    private questionService:QuestionService
  ) { }

  private subscriptions = new Subscription()

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'));
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe()
  }

  onSubmit(){
    this.errorMessages = getFormValidationErrors(this.questionForm)

    if(!this.errorMessages[0]){
      this.subscriptions.add(this.questionService.postQuestion({data: this.questionForm.value})
      .subscribe((res) => { 

        updateUserCurrentPtsCookie(this.cookieService, -this.questionForm.value.rewardPoints)
        this.router.navigate(['/question',res.data.questionId]);
       
      },
      (err) => {
        console.log(err);
        this.errorMessages.push(err.error.error.message)
      }))
    }
  }

  verifyRewardPoints(){
    const maxRewardPoints = this.user.currentPoints
    const minRewardPoints = 10

    if(this.questionForm.value.rewardPoints < minRewardPoints){
      this.questionForm.patchValue({rewardPoints : minRewardPoints})
    }

    if(this.questionForm.value.rewardPoints > maxRewardPoints){
      this.questionForm.patchValue({rewardPoints : maxRewardPoints})
    }
  }

}
