import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionComponent } from './question/question.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { SideUserComponent } from './side-user/side-user.component';
import { AnswerComponent } from './answer/answer.component';
import { CommentComponent } from './comment/comment.component';
import { AnswersComponent } from './answers/answers.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddAnswerComponent } from './add-answer/add-answer.component';
import { CommentsComponent } from './comments/comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { Interceptor } from './interceptor';
import { UserLoginGuardService } from './user-login-guard.service';
import { UserLogoutGuardService } from './user-logout-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    DashboardComponent,
    QuestionComponent,
    SubjectsComponent,
    SideUserComponent,
    AnswerComponent,
    CommentComponent,
    AnswersComponent,
    AddQuestionComponent,
    AddAnswerComponent,
    CommentsComponent,
    AddCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
  ],
  providers: [
    UserLoginGuardService,
    UserLogoutGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
