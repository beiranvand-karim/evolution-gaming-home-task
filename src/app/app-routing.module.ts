import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {ContainerComponent} from './container/container.component';

const routes: Routes = [
  {
    path: '', component: LogInComponent
  },
  {
    path: 'list', component: ContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
