import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

	user: any;
  authToken: any;

  private authUrl = 'http://localhost:3000/api/login';

  constructor(private http:Http) { }

  authenticateUser(username, password){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.post(this.authUrl, JSON.stringify({username: username,password: password}), {headers: headers})
          .map(
              res => res.json(),
              err => console.log(err)
            );
  }

  storeUserData(username){
    localStorage.setItem('uname', username);
  }

}
