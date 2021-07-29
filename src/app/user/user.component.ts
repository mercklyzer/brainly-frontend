import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user!:User

  constructor(
    private cookieService:CookieService
  ) { }

  ngOnInit(): void {
    this.user = this.getDecodedAccessToken(this.cookieService.get('Token'))?.user;
  }

  getDecodedAccessToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      console.log(Error);
      return null;
    }
  }

}
