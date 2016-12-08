import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/auth-guard";
import { AppComponent } from "./app.component";

const routes: Routes = [
  {

    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],

    children: [{
      path: 'main',
      component: MainComponent,
      canActivate: [AuthGuard],
    }]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
