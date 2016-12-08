import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { AccountService } from "./shared/services/account.service";
import { TokenService } from "./shared/services/token.service";
import { HttpService } from "./shared/services/http.service";
import { SimpleNotificationsModule } from "angular2-notifications";
import { MdInputModule } from "@angular/material/input";
import { MdButtonModule } from "@angular/material/button";
import { MdIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SimpleNotificationsModule,
    //TODO check if forms module is mandatory if ReactiveFormsModule exists
    ReactiveFormsModule,
    //Material modules
    MdInputModule,
    MdButtonModule,
    //Did not use
    MdIconModule

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
