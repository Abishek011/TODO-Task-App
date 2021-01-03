import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private dashboard:DashboardComponent,private dashboardService:DashboardService) { }

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
    this.currentTaskStatus="Completed";//task.taskStatus;
    if(this.currentTaskStatus.includes("Not Completed"))
    {
      this.isDone=false;
      this.taskStatus="Mark as Completed";
    }
    else{
      this.isDone=true;
      this.taskStatus="Mark as not completed"; 
    }
  }

  isDone:boolean;
  taskStatus;

  changeTaskStatus(){
    if(this.isDone){
      this.currentTaskStatus="Not Completed";
    this.isDone=!this.isDone;
    this.taskStatus="Mark as done";
    }else{
      this.currentTaskStatus="Completed";
      this.isDone=!this.isDone;
      this.taskStatus="Mark as not completed"; 
    }
    console.log(this.taskStatus)
  }

  ngOnInit(): void {
    this.dashboardService.viewTasks().subscribe(data=>{
      this.tasks=data.body;
      console.log(this.tasks);
      this.tasks=this.tasks.tasks;
      this.viewSelectedTask(this.tasks[0]);
    },error=>{
      console.log(error);
    })
  }

}
