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
import { ListComponent } from './list/list.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import {UserInterfaceService} from './services/user-interface.service';


@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    AddComponent,
    LogInComponent,
    ListComponent,
    DropDownComponent
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
