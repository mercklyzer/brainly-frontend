import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
  
  url?:any
  routerObserver: any

  constructor(
    private router:Router,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      console.log(location.pathname);
      this.url= location.pathname
    })
  }


  

}
