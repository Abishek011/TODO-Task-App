import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router,private dashboardService:DashboardService) {  }

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
    location.reload();
  }

  sortByName(){
    localStorage.setItem("sortByName","true");
    location.reload();
  }

  logOut(){
    localStorage.removeItem("userAuthorizationToken");
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
