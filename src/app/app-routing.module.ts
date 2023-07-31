import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { TeacherRegisterComponent } from './teacher-register/teacher-register.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { EnterMarksComponent } from './enter-marks/enter-marks.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'student-login',component:StudentLoginComponent
  },
  {
    path:'teacher-login',component:TeacherLoginComponent
  },
  {
    path:'teacher-register',component:TeacherRegisterComponent
  },
  {
    path:'teacher-dashboard',component:TeacherDashboardComponent
  },
  {
    path:'student-view/:id',component:StudentViewComponent
  },{
    path:'studentRegister',component:StudentRegisterComponent
  },{
    path:'studentDashboard',component:StudentDashboardComponent
  },{
    path:'studentDetails',component:StudentDetailsComponent
  },{
    path:'enterMarks/:id',component:EnterMarksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
