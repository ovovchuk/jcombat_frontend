import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { AccountService } from "./shared/services/account.service";
import { TokenService } from "./shared/services/token.service";
import { HttpService } from "./shared/services/http.service";
import { SimpleNotificationsModule } from "angular2-notifications";
import { MaterialModule } from "@angular/material";
import { SignUpComponent } from './sign-up/sign-up.component';
import { WebSocketService } from "./shared/services/web-socket.service";
import { TopNavComponent } from "./top-nav/top-nav.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { QuestionManagementComponent } from './question-management/question-management.component';
import { SessionsComponent } from './sessions/sessions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SessionItemComponent } from './sessions/session-item/session-item.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SessionService } from "./shared/services/session.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignUpComponent,
    TopNavComponent,
    SideBarComponent,
    QuestionManagementComponent,
    SessionsComponent,
    LeaderboardComponent,
    SessionItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SimpleNotificationsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    AccountService,
    TokenService,
    HttpService,
    WebSocketService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
