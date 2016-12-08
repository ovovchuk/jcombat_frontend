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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SimpleNotificationsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()
  ],
  providers: [
    AccountService,
    TokenService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
