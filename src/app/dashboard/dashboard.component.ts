import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) {  }

  viewTasks:boolean =true;
  profile:boolean=false;
  addTask:boolean=false;
  viewAllTasks(){
    this.viewTasks=true;
    this.profile=false;
    this.addTask=false;
  }

  viewProfile()
  {
    this.viewTasks=false;
    this.profile=true;
    this.addTask=false;
  }

  logOut(){
    localStorage.removeItem("userAuthorizationToken");
    window.location.reload();
  }


  ngOnInit(): void {
  }

}
