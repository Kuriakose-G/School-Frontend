import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent {

   // register success loading
   regSuccessLoading:string=""

   // register error message
   regErrorMsg:string=""

  constructor(private registerFB:FormBuilder, private api:ApiService, private resgisterRoute:Router){}

  // Validation
  registerForm=this.registerFB.group({
    name:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    studentId:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  })

  studentRegister(){
    if(this.registerForm.valid){
      let studentName=this.registerForm.value.name
      let studentId=this.registerForm.value.studentId
      let studentUsername=this.registerForm.value.username
      let studentPassword=this.registerForm.value.password
      console.log(studentName,studentId,studentUsername,studentPassword);  
      this.api.studentRegister(studentName,studentId,studentUsername,studentPassword).subscribe((result:any)=>{
        alert(result.message)
        this.regSuccessLoading=result.message
        this.resgisterRoute.navigateByUrl('')
      },(result:any)=>{
        this.regErrorMsg=result.error.message
      })
      this.registerForm.reset()
      this.regErrorMsg=''
    }else{
      alert('Invalid Data')
    }
  }

}
