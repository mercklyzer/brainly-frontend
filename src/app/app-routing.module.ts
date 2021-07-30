import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAnswerComponent } from './add-answer/add-answer.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DummyComponent } from './dummy/dummy.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', component: HomepageComponent, pathMatch: 'full'},
  {path: 'dummy', component: DummyComponent, pathMatch: 'full'},
  {path: 'signup', component: SignupComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch:'full'},
  {path: 'dashboard/questions/:subject', component: DashboardComponent, pathMatch:'full'},
  {path: 'dashboard', redirectTo: 'dashboard/questions/all', pathMatch:'full'},
  {path: 'question/:questionId', component: QuestionComponent, pathMatch: 'full'},
  {path: 'question/:questionId/add-answer', component: AddAnswerComponent, pathMatch: 'full'},
  {path: 'ask-question', component: AddQuestionComponent, pathMatch: 'full'},
  {path: '**', redirectTo:'', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
