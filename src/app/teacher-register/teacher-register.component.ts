import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-register',
  templateUrl: './teacher-register.component.html',
  styleUrls: ['./teacher-register.component.css']
})
export class TeacherRegisterComponent {

    // register success loading
    regSuccessLoading:string=""

    // register error message
    regErrorMsg:string=""

    secret:string='LA0018';

  constructor(private registerFB:FormBuilder, private api:ApiService, private registerRoute:Router ){}

  // creating form group for validation
  registerForm=this.registerFB.group({
    name:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    secretId:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    classN: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.max(12)]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  })

  register(){
    if(this.registerForm.valid){
      let name=this.registerForm.value.name
      let secretId=this.registerForm.value.secretId
      let username=this.registerForm.value.username
      let classN=this.registerForm.value.classN
      let password=this.registerForm.value.password
      if(secretId==this.secret){
        this.api.register(name,username,classN,password).subscribe((result:any)=>{
          alert(result.message)
          this.regSuccessLoading=result.message
          this.registerRoute.navigateByUrl('')

        },((result:any)=>{
          this.regErrorMsg=result.error.message
        }))
        this.registerForm.reset()
        this.regErrorMsg=""
      }else{
        alert('Invalid Data')
      }
    }
  }

}
