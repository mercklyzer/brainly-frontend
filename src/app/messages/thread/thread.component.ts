import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Message } from 'src/app/models/message.model';
import { Thread } from 'src/app/models/thread.model';
import { User } from 'src/app/models/user.model';
import { ThreadsService } from 'src/app/threads.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('scrollMe') myScrollContainer!:ElementRef;

  @Input() messages!:Message[]
  @Output() submit = new EventEmitter<{data : Message}>()

  user!:User
  thread!:Thread
  
  threadObserver:any
  routeObserver:any

  messageForm!:FormGroup 

  constructor(
    private fb:FormBuilder,
    private cookieService:CookieService,
    private threadsService: ThreadsService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'))

    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.threadObserver = this.threadsService.getThread(routeParams.threadId)
      .subscribe((res) => {
        console.log("thread fetched");
        console.log(res);
        this.thread = res.data

        this.messageForm = this.fb.group({
          message: ['', Validators.required],
          threadId:[this.thread.threadId],
          senderId: [this.user.userId],
          senderUsername: [this.user.username],
          senderProfilePicture: [this.user.profilePicture],
          receiverId: [this.thread.user1Id === this.user.userId? this.thread.user2Id : this.thread.user1Id],
          receiverUsername: [this.thread.user1Username === this.user.username? this.thread.user2Username : this.thread.user1Username],
          receiverProfilePicture: [this.thread.user1ProfilePicture === this.user.profilePicture? this.thread.user2ProfilePicture : this.thread.user1ProfilePicture],
        })
      },
      (err) => {
        console.log(err);
      })
    })
  }

  ngOnChanges(changes: any):void{
    console.log(changes.messages);
    this.messages = changes.messages.currentValue
    console.log("messages");
    console.log(this.messages);
  }

  ngAfterViewChecked():void{
      this.scrollToBottom();        
  }

  onSubmit():void{
    console.log(this.messageForm.value);
    this.submit.emit({data: this.messageForm.value})
    this.messageForm.get('message')?.reset()
  }

  scrollToBottom():void{
    try{
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch(e){
      console.log(e);
    }
  }

}
