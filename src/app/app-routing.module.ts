import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/auth-guard";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { QuestionManagementComponent } from "./question-management/question-management.component"

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: SessionsComponent, canActivate: [AuthGuard] },
      { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
      { path: 'questions', component: QuestionManagementComponent, canActivate: [AuthGuard]}
    ] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
