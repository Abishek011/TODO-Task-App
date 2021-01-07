import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  isNavigated:boolean;

  userEmail;

  private signUp_url="https://app--todo.herokuapp.com/user";

  private logIn_url="https://app--todo.herokuapp.com/user/login";

  private viewTask_url="https://app--todo.herokuapp.com/user/dashBoard/viewTasks";

  private addTask_url="https://app--todo.herokuapp.com/user/dashBoard/addTask";

  private deleteTask_url="https://app--todo.herokuapp.com/user/dashBoard/deleteTask";
  
  private changeTaskStatus_url="https://app--todo.herokuapp.com/user/dashBoard/changeTaskStatus";

  userAuthorizationToken=localStorage.getItem('userAuthorizationToken');

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',}),
    withCredentials: false,
    observe: 'response' as 'response',
    body:undefined,
  };

  constructor(private http:HttpClient) { }

  userLogIn(logInDetails)
  {
    return this.http.post(this.logIn_url,logInDetails,this.httpOptions);
  }

  userSignUp(signUpDetails){
    return this.http.post(this.signUp_url,signUpDetails,this.httpOptions);
  }

  viewTasks(){
    return this.http.post(this.viewTask_url,{userAuthCookie :this.userAuthorizationToken},this.httpOptions);
  }

  addTask(taskName:String,taskDescription:String){
    return this.http.post(this.addTask_url,{"taskName":taskName,
    "taskDescription":taskDescription,
    userAuthCookie :this.userAuthorizationToken,
  },this.httpOptions);
  }

  deleteTask(taskName:String){
    this.httpOptions.body={
      userAuthCookie :this.userAuthorizationToken,
      taskName:taskName,
    }
    return this.http.delete(this.deleteTask_url,this.httpOptions);
  }

  changeTaskStatus(taskName:String){
    return this.http.post(this.changeTaskStatus_url,{
      userAuthCookie :this.userAuthorizationToken,
      taskName:taskName,
    },this.httpOptions);
  }

  
}

