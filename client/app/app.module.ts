import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DeepMaterialModule } from './modules/deep-material/deep-material.module';
import { MaterialModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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

import { ConversationsService } from './services/conversations.service';
import { LoginService } from './services/login.service';
import { SignUpService } from './services/sign-up.service';
import { ContactComponent } from './components/contact/contact.component'
import { DashboardGuard } from './guards/dashboard.guard'
import { HomeGuard } from './guards/home.guard'
import { DashboardRoutingModule } from './modules/dashboard/dashboard-routing.module';
import { ChatStatusBarComponent } from './components/chat-status-bar/chat-status-bar.component';
import { ChatBoardComponent } from './components/chat-board/chat-board.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { SearchComponent } from './components/search/search.component';
import { SearchContactsService } from './services/search-contacts.service';
import { MessageComponent } from './components/message/message.component';
import { SessionService } from './services/session.service';
import { ConvoListComponent } from './components/convo-list/convo-list.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ConvoComponent } from './components/convo/convo.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardResolve } from './guards/dashboard.resolver';
import { ContactsService } from './services/contacts.service';
import { SocketService } from './services/socket.service';
import { MessageTimestampPipe } from './pipes/message-timestamp.pipe';
import { RemoveContactDialogComponent } from './components/remove-contact-dialog/remove-contact-dialog.component';
import { AddContactDialogComponent } from './components/add-contact-dialog/add-contact-dialog.component';
import { MapAsArrayPipe } from './pipes/map-as-array.pipe';
import { AcceptContactDialogComponent } from './components/accept-contact-dialog/accept-contact-dialog.component';
import { IgnoreContactDialogComponent } from './components/ignore-contact-dialog/ignore-contact-dialog.component';
import { GroupConversationDialogComponent } from './components/group-conversation-dialog/group-conversation-dialog.component';
import { DateToMomentPipe } from './pipes/date-to-moment.pipe'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    ContactComponent,
    ChatStatusBarComponent,
    ChatBoardComponent,
    ChatInputComponent,
    SearchComponent,
    MessageComponent,
    ConvoListComponent,
    ContactListComponent,
    ConvoComponent,
    NotificationListComponent,
    NotificationComponent,
    MessageTimestampPipe,
    RemoveContactDialogComponent,
    AddContactDialogComponent,
    MapAsArrayPipe,
    AcceptContactDialogComponent,
    IgnoreContactDialogComponent,
    GroupConversationDialogComponent,
    DateToMomentPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DeepMaterialModule,
    HttpModule,
    HttpClientModule,
    DashboardRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    AuthModule
  ],
  providers: [
    DashboardGuard,
    HomeGuard,
    ConversationsService, 
    LoginService,
    SignUpService,
    SearchContactsService,
    SessionService,
    DashboardResolve,
    ContactsService,
    SocketService
  ],
  entryComponents: [
    AddContactDialogComponent, 
    RemoveContactDialogComponent,
    IgnoreContactDialogComponent,
    AcceptContactDialogComponent, 
    GroupConversationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
