import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeepMaterialModule } from './modules/deep-material/deep-material.module';
import { MaterialModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatComponent } from './components/chat/chat.component';
import { HttpModule } from '@angular/http';

import { UsersService } from './services/users.service';
import { MessagesService } from './services/messages.service';
import { ConversationsService } from './services/conversations.service';
import { LoginService } from './services/login.service';
import { SignUpService } from './services/sign-up.service';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PageNotFoundComponent,
    SettingsComponent,
    HomeComponent,
    NavbarComponent,
    ChatComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DeepMaterialModule,
    HttpModule,
    DashboardRoutingModule,
    AppRoutingModule
  ],
  providers: [
    UsersService, 
    MessagesService, 
    ConversationsService, 
    LoginService,
    SignUpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
