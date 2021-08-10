import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  threads:Thread[] = []
  messages:Message[] = []
  // user!:User

  constructor(
    private threadsService:ThreadsService,
    private route: ActivatedRoute,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.routeObserver = this.route.params.subscribe((routeParams) => {
      this.messageLoadObserver = this.messageService.getMessages(routeParams.threadId)
      .subscribe((res) => {
        this.messages = res.data.reverse()
      })
    })
    
    // this.user = JSON.parse(this.cookieService.get('User'))
    this.threadsObserver = this.threadsService.getThreads()
    .subscribe((res) => {
      this.threads = res.data
      console.log(`THREADS: ${this.threads}`);
    },
    (err) => {
      console.log(err);
    })
  }

  onSubmit(message:{data:Message}){
    this.messageSendObserver = this.messageService.addMessage(message)
    .subscribe((res) => {
      this.messages = this.messages.concat(res.data)
      console.log("parent");
      console.log(this.messages);
    })
  }

}
