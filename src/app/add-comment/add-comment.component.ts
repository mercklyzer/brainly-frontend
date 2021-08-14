import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { Answer } from '../models/answer.model';
import { Comment } from '../models/comment.model';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() question!:Question
  @Input() answer?:Answer
  @Output() submit = new EventEmitter<{data : Comment}>()

  user!:User

  commentForm:FormGroup = this.fb.group({
    comment: ['', Validators.required]
  })


  constructor(
    private fb:FormBuilder,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))
  }

  onSubmit():void{
    this.submit.emit({data: this.commentForm.value})
    this.commentForm.reset()
  }

}
