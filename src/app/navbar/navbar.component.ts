import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // start of navbar animation on scroll
  sticky:boolean = false
  @ViewChild('stickyNavbar', {static: false}) stickyNavbar?: ElementRef;
  @HostListener('window:scroll', ['$event'])

  onWindowScroll() {
    if(this.url === '/'){
      this.sticky = window.pageYOffset > 0 ? true : false
    }
  }
  // end of navbar animation on scroll
  
  url?:string
  routerObserver: any
  user:User | null = null

  constructor(
    private router:Router,
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    // keep track of the value of the route (url) and check if user cookie exists
    this.routerObserver = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe((receivedEvent) => {
        if(receivedEvent instanceof NavigationEnd){
          this.url = receivedEvent.url;
          this.user = this.cookieService.get('User')? JSON.parse(this.cookieService.get('User')) : null;
        }
      });
  }

  ngOnDestroy():void{
    this.routerObserver.unsubscribe()
  }

  onLogOut():void{
    // this.user = null
    this.deleteCookies()
  }

  deleteCookies():void{
    this.cookieService.removeAll()
  }
}
