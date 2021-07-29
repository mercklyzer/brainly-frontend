import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/user.model';
import jwt_decode from 'jwt-decode';

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
