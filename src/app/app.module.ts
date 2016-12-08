import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { AccountService } from "./shared/services/account.service";
import { TokenService } from "./shared/services/token.service";
import { HttpService } from "./shared/services/http.service";
import { SimpleNotificationsModule } from "angular2-notifications";

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
    SimpleNotificationsModule
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
