import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AnswerService } from '../services/answer.service';
import { Question } from '../models/question.model';
import { QuestionService } from '../services/question.service';
import { getFormValidationErrors, updateUserCurrentPtsCookie } from '../utils/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit, OnDestroy {
  question!:Question

  errorMessages:String[] = []

  answerForm:FormGroup = this.fb.group({
    answer: ['', Validators.required]
  })

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private questionService:QuestionService,
    private answerService:AnswerService,
    private cookieService:CookieService,
  ) { }

  private subscriptions = new Subscription()

  @HostListener('window:beforeunload')
  beforeClose(){
    this.answerService.socketUpdateTypingAnswer(this.question.questionId, false)
  }

  ngOnInit(): void {
    this.subscriptions.add(this.route.params.subscribe((routeParams) => {
      this.subscriptions.add(this.questionService.getQuestion(routeParams.questionId)
      .subscribe((question) => {
        this.question = question.data
      }))
    }))
  }

  ngOnDestroy():void{
    this.subscriptions.unsubscribe()
  }

  onSubmit(){
    this.errorMessages = getFormValidationErrors(this.answerForm)

    if(!this.errorMessages[0]){
      this.subscriptions.add(this.answerService.postAnswer(this.question.questionId, {data: this.answerForm.value})
      .subscribe((res) => {
        console.log(res);

        updateUserCurrentPtsCookie(this.cookieService, Number(this.question.rewardPoints))

        this.answerService.socketUpdateTypingAnswer(this.question.questionId, false)
        this.router.navigate(['/question',res.data.questionId]);
      },
      (err) => {
        this.errorMessages.push(err.error.error.message)
        console.log(err);
      }))
    }
  }

  updateAnswerTyping(key:KeyboardEvent){
    console.log(key);
    if(this.answerForm.get('answer')?.value !== '' && key.key !== "Enter"){
      console.log("true");
      this.subscriptions.add(this.answerService.socketUpdateTypingAnswer(this.question.questionId, true))

    }
    else{
      console.log("false");
      this.subscriptions.add(this.answerService.socketUpdateTypingAnswer(this.question.questionId, false))
    }
  }

}
