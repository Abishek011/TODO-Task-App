import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {  }

  
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
    window.location.reload();
  }


  status1:boolean=true;
  status2:boolean=false;

  sidebar(){
    this.status1=!this.status1;
    this.status2=!this.status2;
  }

  /* 

  $(function() {
    $("#fullPage").click(function() {
      $("#rightWrapper").toggleClass("full-page");
      $("#header").toggleClass("full-page");
    });
  })
  
  $(function() {
    $("#listView li").click(function () {
      if ( $("#listView li").hasClass("list-item-active") ) {
        $("#listView li").removeClass("list-item-active");
      }
      $(this).addClass("list-item-active");
    });
  });
   */

}
