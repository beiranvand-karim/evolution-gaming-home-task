import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {ListComponent} from './list/list.component';

const routes: Routes = [
  {
    path: '', component: LogInComponent
  },
  {
    path: 'list', component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
