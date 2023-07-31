import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { EnterMarksComponent } from './enter-marks/enter-marks.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeacherLoginComponent,
    StudentLoginComponent,
    TeacherRegisterComponent,
    TeacherDashboardComponent,
    StudentViewComponent,
    StudentRegisterComponent,
    StudentDashboardComponent,
    StudentDetailsComponent,
    EnterMarksComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
