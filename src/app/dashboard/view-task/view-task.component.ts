import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allowedNodeEnvironmentFlags } from 'process';
import { UserComponent } from 'src/app/user/user.component';
import { UserService } from 'src/app/user/user.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DashboardComponent } from '../dashboard.component';
import { DashboardService } from '../dashboard.service';
import { task } from 'src/app/moduleInterfaces'

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks:task[];
  serverResponse:any;
  currentTaskName:String;
  currentTaskDescription:String;
  currentTaskAddedTime:String;
  currentTaskStatus:String;
  isDone: boolean = false;
  taskStatus:String;
  searchTerm:String;
  taskCopy:task[];
  editTaskName:String;
  editTaskDescription:String;

  constructor(private dashboard: DashboardComponent,
    private dashboardService: DashboardService,
    private userService: UserService,
    private router: Router) {

    localStorage.removeItem("isDone");
  }

  ngOnInit(): void {
    this.dashboardService.viewTasks().subscribe(data => {
      this.serverResponse = data.body;
      this.serverResponse = this.serverResponse.tasks;
      this.tasks = this.serverResponse;
      console.log(this.tasks);
      this.taskCopy = this.tasks;
      if (localStorage.getItem("isDone") == "true") {
        this.dashboardService.addTask(this.editTaskName, this.editTaskDescription).subscribe(data => {
          console.log('raerdsa', data);
          this.serverResponse = data.body;
          if (this.serverResponse.Message.includes("Task Added successfully")) {
            console.log(data);
          }
        });
        localStorage.setItem("isDone", "fasle");
      }
      /*  if(localStorage.getItem('sortByTime')=='true'){
         this.tasks.sort((a,b) => a.taskAddedTime.localeCompare(b.taskAddedTime));
       } */
      this.viewSelectedTask(this.tasks[0]);
    }, response => {
      if (response.status == 401) {
        alert("       Login again");
        this.router.navigate(["user"]);
        this.userService.isNavigated = true;
      }
    })
  }

  addTask() {
    this.dashboard.addTask = !this.dashboard.addTask;
    this.dashboard.profile = false;
    this.dashboard.viewTasks = false;
  }

  async deleteTask(taskName: String, refresh: boolean) {
    await this.dashboardService.deleteTask(taskName).subscribe(data => {
      this.serverResponse = data.body;
      if (this.serverResponse.Message.includes("Task deleted successfully") && refresh) {
        this.ngOnInit();
      }
    })
  }

  viewSelectedTask(task): void {
    this.currentTaskName = task.taskName;
    this.currentTaskDescription = task.taskDescription;
    this.currentTaskAddedTime = task.taskAddedTime;
    this.currentTaskStatus = task.taskStatus;
    if (this.currentTaskStatus.includes("Not Completed")) {
      this.taskStatus = "Mark as Completed";
    }
    else {
      this.taskStatus = "Mark as not completed";
    }
  }

  changeTaskStatus() {
    this.dashboardService.changeTaskStatus(this.currentTaskName).subscribe(data => {
      var temp;
      temp = data.body;
      if (temp.Message.includes("Task status updated")) {
        this.ngOnInit();
      }
    });
  }

  search(): void {
    var term =  this.searchTerm;
    this.tasks = this.taskCopy.filter(function (tag) {
      return tag.taskName.includes(term+"");
    });
    if (this.tasks.length != 0) {
      this.viewSelectedTask(this.tasks[0]);
    }
    else {
      this.viewSelectedTask({
        taskName: "No Such task found",
        taskDescription: "The task that you are searching is not found in the list of tasks",
        taskAddedTime: new Date(),
        taskStatus: "Task Not found",
      });
    }
  }

  async addDescription(AddedDescription) {
    this.editTaskName = this.currentTaskName;
    this.editTaskDescription = this.currentTaskDescription + AddedDescription;
    await this.deleteTask(this.currentTaskName, true);
    localStorage.setItem("isDone", "true");
    this.ngOnInit();
  }

}
