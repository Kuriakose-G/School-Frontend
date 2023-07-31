import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent {

  loginErrorMsg: string = ""
  loginSuccessStatus: boolean = false;

  constructor(private api:ApiService, private loginRoute:Router, private loginFB:FormBuilder){}

  loginForm=this.loginFB.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login(){
    if(this.loginForm.valid){
      let username=this.loginForm.value.username
      let password=this.loginForm.value.password
      this.api.login(username,password).subscribe((result:any)=>{
        this.loginSuccessStatus= true;
        localStorage.setItem("currentUser",result.currentUser)
        localStorage.setItem("class",result.currentClass)
        localStorage.setItem("token",result.token)
        setTimeout(() => {
          this.loginRoute.navigateByUrl('/teacher-dashboard')
        }, 2000);
      },(result:any)=>{
        this.loginErrorMsg=result.error.message
        alert(this.loginErrorMsg)
        this.loginForm.reset()
        this.loginErrorMsg=""
      })
    }else{
      alert('Invalid Data')
    }
  }

}
