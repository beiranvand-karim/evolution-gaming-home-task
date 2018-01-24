import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {WebSocketService} from './services/web-socket.service';
import {ChatService} from './services/chat.service';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
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
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
