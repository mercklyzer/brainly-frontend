import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { MessageService } from '../message.service';
import { Message } from '../models/message.model';
import { Thread } from '../models/thread.model';
import { ThreadsService } from '../threads.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  threadsObserver:any
  messageLoadObserver:any
  messageSendObserver:any
  routeObserver:any

  socketMessageObserver: any
  socketThreadObserver: any
  messageTypingObserver:any


  threads:Thread[] = []
  messages:Message[] = []

  messageTyping:boolean = false


  constructor(
    private threadsService:ThreadsService,
    private route: ActivatedRoute,
    private messageService:MessageService,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.messageService.socketJoinRoom(JSON.parse(this.cookieService.get('User')).userId)
    this.socketMessageObserver = this.messageService.newMessage.subscribe(message => {
      console.log("message received");
      this.messages.push(message)
    })

    this.messageTypingObserver = this.messageService.messageTyping.subscribe(boolVal => {
      this.messageTyping = boolVal
      console.log("message typing: ", boolVal);
    })

    this.socketThreadObserver = this.threadsService.newThread.subscribe(thread => {
      console.log("new thread");
      console.log(thread);
      this.threads = this.insertThread(this.threads, thread)
    })


    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.messageLoadObserver = this.messageService.getMessages(routeParams.threadId)
      .subscribe((res) => {
        this.messages = res.data.reverse()
      })
    })
    
    this.threadsObserver = this.threadsService.getThreads()
    .subscribe((res) => {
      this.threads = res.data
    },
    (err) => {
      console.log(err);
    })
  }

  onSubmit(message:{data:Message}){
    this.messageSendObserver = this.messageService.addMessage(message)
    .subscribe((res) => {
      this.socketMessageObserver = this.messageService.socketAddMessage(message.data)

      // this.messages = this.messages.concat(res.data)

    })
  }

  insertThread(threads:Thread[], thread: Thread){
    let index = threads.map((el) => el.threadId).indexOf(thread.threadId)

    // if thread exists
    if(index !== -1){
      threads.splice(index, 1)
    }

    return threads = [thread].concat(threads)
  }

}
