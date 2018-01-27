import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {WebSocketService} from './services/web-socket.service';
import {ChatService} from './services/chat.service';
import {ReactiveFormsModule} from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';
import { LogInComponent } from './log-in/log-in.component';
import {UserInterfaceService} from './services/user-interface.service';
import { TablesListComponent } from './tables-list/tables-list.component';
import { TableItemComponent } from './table-item/table-item.component';
import { ContainerComponent } from './container/container.component';


@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    AddComponent,
    LogInComponent,
    TablesListComponent,
    TableItemComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    WebSocketService,
    ChatService,
    UserInterfaceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
