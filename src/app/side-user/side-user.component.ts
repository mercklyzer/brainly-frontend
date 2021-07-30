import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';

@Component({
  selector: 'app-side-user',
  templateUrl: './side-user.component.html',
  styleUrls: ['./side-user.component.css']
})
export class SideUserComponent implements OnInit {
  user!:User

  constructor(
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieService.get('User'));
  }
}
