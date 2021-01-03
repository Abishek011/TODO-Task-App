import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  loginSwitch: boolean = true;
  register() {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementsByClassName("bttn");
    x.style.left = "-400px";
    y.style.left = "50px";
    this.loginSwitch = !this.loginSwitch;
  }

  login() {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementsByClassName("bttn");
    x.style.left = "50px";
    y.style.left = "450px";
    this.loginSwitch = !this.loginSwitch;
  }

  serverResponse;

  onLogIn(form:NgForm){
    this.userService.userLogIn(form).subscribe(data=>{
      console.log(data.body);
      this.serverResponse=(data.body);
      if(this.serverResponse.message.includes("logIn Successful"))
      {
        localStorage.setItem("userAuthorizationToken",this.serverResponse.cookie);
        this.router.navigate(['user/dashBoard']);
      }
    });
  }

  onSignUp(form:NgForm){
    this.userService.userSignUp(form).subscribe(data=>{
      this.serverResponse=data.body;
      if(this.serverResponse.message.includes("User Created"))
      {
        this.onLogIn(form);
      }
      else{
        alert("User already exist");
      }
    })
  }

  refreshOnce(){
    window.location.reload();
  }

  ngOnInit(): void {
    if(this.userService.isNavigated)
    {
      this.refreshOnce();
    }
  }

}
