import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(private http: Http) {
    this.url = GLOBAL.url;

  }

  public sigup(user_login, gethash = null) {

    if (gethash != null) {
      user_login.gethash = gethash;
    }

    let json = JSON.stringify(user_login);
    let params = json;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.url + 'login', params, { headers: headers })
      .pipe(map(res => res.json()));
  }

  public register(user_register) {

    let json = JSON.stringify(user_register);
    let params = json;
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.url + 'register', params, { headers: headers })
      .pipe(map(res => res.json()));
  }

  public getidentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity != "undefined") {
      this.identity = identity;

    } else {
      this.identity = null;
    }

    return this.identity;
  }

  public getToken() {

    let token = localStorage.getItem('token');

    if (token != "undefined") {
      this.token = token;

    } else {
      this.token = null;
    }

    return this.token;

  }
}
