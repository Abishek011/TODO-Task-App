import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
      {path: 'user/dashBoard', component: DashboardComponent},
      {path: 'user', component: UserComponent},
      {path: '', redirectTo: '/user', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
