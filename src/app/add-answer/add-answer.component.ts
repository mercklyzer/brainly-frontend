import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AnswerService } from '../answer.service';
import { Question } from '../models/question.model';
import { QuestionService } from '../question.service';
import { getFormValidationErrors, updateUserCurrentPtsCookie } from '../utils/utils';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {
  question!:Question

  answerObserver:any
  routeObserver:any
  questionObserver:any

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

  answerTypingObserver:any

  @HostListener('window:beforeunload')
  beforeClose(){
    this.answerService.socketUpdateTypingAnswer(this.question.questionId, false)
  }

  ngOnInit(): void {
    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.questionObserver = this.questionService.getQuestion(routeParams.questionId)
      .subscribe((question) => {
        this.question = question.data
      })
    })
  }

  onSubmit(){
    this.errorMessages = getFormValidationErrors(this.answerForm)

    if(!this.errorMessages[0]){
      this.answerObserver = this.answerService.postAnswer(this.question.questionId, {data: this.answerForm.value})
      .subscribe((res) => {
        console.log(res);

        updateUserCurrentPtsCookie(this.cookieService, Number(this.question.rewardPoints))

        this.answerService.socketAddAnswer(res.data)
        this.answerService.socketUpdateTypingAnswer(this.question.questionId, false)


        this.router.navigate(['/question',res.data.questionId]);
      },
      (err) => {
        this.errorMessages.push(err.error.error.message)
        console.log(err);
      })
    }
  }

  updateAnswerTyping(key:KeyboardEvent){
    console.log(key);
    if(this.answerForm.get('answer')?.value !== '' && key.key !== "Enter"){
      console.log("true");
      this.answerTypingObserver = this.answerService.socketUpdateTypingAnswer(this.question.questionId, true)

    }
    else{
      console.log("false");
      this.answerTypingObserver = this.answerService.socketUpdateTypingAnswer(this.question.questionId, false)
    }
  }

}
