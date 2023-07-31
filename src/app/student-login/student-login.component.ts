import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {

  loginErrorMsg: string = ""
  loginSuccessStatus: boolean = false;

  constructor(private api:ApiService, private loginRoute:Router,private loginFB:FormBuilder){}

  loginForm=this.loginFB.group({
    studentUsername:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    studentPassword:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  studentLogin(){
    if(this.loginForm.valid){
      let studentUsername=this.loginForm.value.studentUsername
      let studentPassword=this.loginForm.value.studentPassword
      this.api.studentLogin(studentUsername,studentPassword).subscribe((result:any)=>{
        this.loginSuccessStatus=true;
        localStorage.setItem("currentStudent",result.currentStudent)
        localStorage.setItem("token",result.token)
        setTimeout(() => {
          this.loginRoute.navigateByUrl('/studentDashboard')
        }, 2000);
      },(result:any)=>{
        this.loginErrorMsg=result.error.message
        alert(this.loginErrorMsg)
        this.loginForm.reset()
        this.loginErrorMsg=''
      })
    }else{
      alert('Invalid Data')
    }
  }
}
