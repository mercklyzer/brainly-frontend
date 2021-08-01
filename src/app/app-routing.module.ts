import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAnswerComponent } from './add-answer/add-answer.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { SignupComponent } from './signup/signup.component';
import { UserLoginGuardService } from './user-login-guard.service';
import { UserLogoutGuardService } from './user-logout-guard.service';
const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'signup', component: SignupComponent, canActivate:[UserLogoutGuardService],pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate:[UserLogoutGuardService],pathMatch:'full'},
  {path: 'dashboard/questions/:subject', component: DashboardComponent, canActivate:[UserLoginGuardService], pathMatch:'full'},
  {path: 'dashboard', redirectTo: 'dashboard/questions/all', pathMatch:'full'},
  {path: 'question/:questionId', component: QuestionComponent, canActivate:[UserLoginGuardService], pathMatch: 'full'},
  {path: 'question/:questionId/add-answer', component: AddAnswerComponent, canActivate:[UserLoginGuardService], pathMatch: 'full'},
  {path: 'question/:questionId/edit-question', component: EditQuestionComponent, canActivate:[UserLoginGuardService], pathMatch: 'full'},
  {path: 'ask-question', component: AddQuestionComponent, canActivate:[UserLoginGuardService],pathMatch: 'full'},
  {path: '**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
