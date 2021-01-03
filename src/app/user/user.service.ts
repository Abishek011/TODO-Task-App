import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private signUp_url="https://app--todo.herokuapp.com/user";

  private logIn_url="https://app--todo.herokuapp.com/user/login";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: false,
    observe: 'response' as 'response'
  };

  userLogIn(logInDetails)
  {
    return this.http.post(this.logIn_url,logInDetails,this.httpOptions);
  }

  userSignUp(signUpDetails){
    return this.http.post(this.signUp_url,signUpDetails,this.httpOptions);
  }
}
