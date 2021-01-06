import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor(private dashboardService:DashboardService,private dashboard:DashboardComponent) { }

  ngOnInit(): void {
  }

  serverResponse:any;

  addTask(taskName,taskDescription){
    this.dashboardService.addTask(taskName,taskDescription).subscribe(data=>{
      this.serverResponse=data.body;
      if(this.serverResponse.Message.includes("Task Added successfully")){
        alert("Task Added successfully");
        this.dashboard.viewAllTasks();
      }
    });
  }

  

}
