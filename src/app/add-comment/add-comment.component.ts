import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Answer } from '../models/answer.model';
import { Comment } from '../models/comment.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() question!:Question
  @Input() answer?:Answer
  @Output() submit = new EventEmitter<{data : Comment}>()

  commentForm:FormGroup = this.fb.group({
    comment: ['', Validators.required]
  })


  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {

  }

  onSubmit():void{
    this.submit.emit({data: this.commentForm.value})
    this.commentForm.reset()
  }

}
