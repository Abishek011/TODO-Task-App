import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router,private service:ServiceService) {  }

  ngOnInit(): void {
  }

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

  sortByTime(){
    localStorage.setItem("sortByTime","true");
  }

  sortByName(){
    localStorage.setItem("sortByName","true");
    location.reload();
  }

  logOut(){
    localStorage.removeItem("userAuthorizationToken");
    this.service.isNavigated=true;
    this.router.navigate(['/']);
  }

/* 
  status1:boolean=true;
  status2:boolean=false;

  sidebar(){
    this.status1=!this.status1;
    this.status2=!this.status2;
  } */
}
