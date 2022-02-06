import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { QuestionService } from '../services/question.service';
import { getFormValidationErrors, titleCase } from '../utils/utils';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  user!:User
  question!:Question
  questionObserver:any
  routeObserver:any

  errorMessages:string[] = []

  helper = {
    titleCase:titleCase
  }

  editQuestionForm:FormGroup = this.fb.group({
    newQuestion: ['', Validators.required],
  })

  constructor(
    private cookieService:CookieService,
    private questionService:QuestionService,
    private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'));
    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.questionObserver = this.questionService.getQuestion(routeParams.questionId)
      .subscribe((question) => {
        this.question = question.data
        this.editQuestionForm.patchValue({newQuestion: this.question.question})
      },
      (err) => {
        console.log(err.error.error.message);
        this.router.navigate(['/dashboard'])
      })
    })
  }

  onSubmit(){
    this.errorMessages = getFormValidationErrors(this.editQuestionForm)

    if(!this.errorMessages[0]){
      this.questionObserver = this.questionService.editQuestion(this.question.questionId, {data: this.editQuestionForm.value})
      .subscribe((res) => { 
        this.router.navigate(['/question',res.data.questionId]);
      },
      (err) => {
        console.log(err);
        this.errorMessages.push(err.error.error.message)
      })
    }
  }

}
