import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allowedNodeEnvironmentFlags } from 'process';
import { UserComponent } from 'src/app/user/user.component';
import { UserService } from 'src/app/user/user.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DashboardComponent } from '../dashboard.component';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private dashboard:DashboardComponent,
    private dashboardService:DashboardService,
    private userService:UserService,
    private router:Router) { }

  tasks;

  addTask(){
    this.dashboard.addTask=!this.dashboard.addTask;
    this.dashboard.profile=false;
    this.dashboard.viewTasks=false;
  }

  serverResponse;

  deleteTask(taskName:String){
    this.dashboardService.deleteTask(taskName).subscribe(data=>{
      this.serverResponse=data.body;
      if(this.serverResponse.Message.includes("Task deleted successfully"))
      {
        window.location.reload();
      }
    })
  }

  currentTaskName;
  currentTaskDescription;
  currentTaskAddedTime;
  currentTaskStatus;

  viewSelectedTask(task){
    this.currentTaskName=task.taskName;
    this.currentTaskDescription=task.taskDescription;
    this.currentTaskAddedTime=task.taskAddedTime;
    this.currentTaskStatus=task.taskStatus;
    if(this.currentTaskStatus.includes("Not Completed"))
    {
      this.taskStatus="Mark as Completed";
    }
    else{
      this.taskStatus="Mark as not completed"; 
    }
  }

  isDone:boolean;
  taskStatus;

  changeTaskStatus(){
    this.dashboardService.changeTaskStatus(this.currentTaskName).subscribe(data=>{
      var temp;
      temp=data.body;
      if(temp.Message.includes("Task status updated"))
      {
        window.location.reload();
      }
    }); 
  }


  searchTerm;
  taskCopy;

  search(): void {
    let term = this.searchTerm;
    this.tasks = this.taskCopy.filter(function(tag) {
        return tag.taskName.includes(term);
    }); 
    if(this.tasks.length!=0){
    this.viewSelectedTask(this.tasks[0]);
  }
    else{
      this.viewSelectedTask({
        taskName:"No Such task found",
        taskDescription:"The task that you are searching is not found in the list of tasks",
        taskAddedTime:new Date(),
        taskStatus:"Task Not found",
      });
    }
}

async addDescription(AddedDescription){
  await this.deleteTask(this.currentTaskName);
  this.dashboardService.addTask(this.currentTaskName,this.currentTaskDescription+AddedDescription).subscribe(data=>{
    console.log('raerdsa',data);
    this.serverResponse=data;
    if(this.serverResponse.Message.includes("Task Added successfully")){
      console.log(data);
    }
  });
}

  ngOnInit(): void {
    this.dashboardService.viewTasks().subscribe(data=>{
      this.tasks=data.body;
      console.log(this.tasks);
      this.tasks=this.tasks.tasks;
      this.taskCopy=this.tasks;
      this.viewSelectedTask(this.tasks[0]);
      if(localStorage.getItem('sortByName')=='true'){
        this.tasks.sort((a,b) => a.taskName.localeCompare(b.taskName));
      }
      if(localStorage.getItem('sortByTime')=='true'){
        this.tasks.sort((a,b) => a.taskAddedTime.localeCompare(b.taskAddedTime));
      }
    },response=>{
      if(response.status==401){
        alert("Unauthorized");
        this.router.navigate(["user"]);
        this.userService.isNavigated=true;
      }
    })
  }

}
