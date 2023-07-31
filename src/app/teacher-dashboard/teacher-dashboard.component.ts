import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit{

  user:string='';
  classM:string='';
  teacherName:string='';
  allstudents:any=[];
  studentNo:string=''
  studentName:string=''
  searchTerm:string=''

  addSuccess:string=''
  addError:string=''

  constructor(private studentFB:FormBuilder, private api:ApiService, private DashboardRouter:Router){}


  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.user=localStorage.getItem('currentUser')||""
    }
    if(localStorage.getItem('class')){
      this.classM=localStorage.getItem('class')||""
    }
   this.getStudents()
  } 


  
  addStudent=this.studentFB.group({
    studentName:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    studentid:['',[Validators.required,Validators.pattern('[A-Z0-9]*')]]
  })

  addStu(){
    if(this.addStudent.valid){
      console.log();
      let studentName=this.addStudent.value.studentName
      let studentId=this.addStudent.value.studentid
      let teacherName=this.user
      this.api.addStudent(studentName,studentId,teacherName).subscribe((result:any)=>{
        // alert(result.message)
        this.addSuccess=result.message
        setTimeout(() => {
          this.addStudent.reset()
          this.addSuccess=''
        }, 2000);
      },(result:any)=>{
        this.addError=result.error.message
        setTimeout(() => {
          this.addStudent.reset()
          this.addError=''
        }, 2000);
      })
    }else{
      alert('Invalid Data')
    }
  }

  getStudents(){
    let teacherName=this.user
    this.api.getStudents(teacherName).subscribe((result:any)=>{
      this.allstudents=result.students
      this.studentNo=this.allstudents.length
      console.log(this.allstudents);
      },(result:any)=>{
      console.log(result.error.message);
    })
  }

  

  reset(){
    this.addStudent.reset()
  }

  logout(){
    localStorage.clear()
    this.DashboardRouter.navigateByUrl('')
  }

  confirmRemoveStudent(id: any) {
    const confirmation = confirm('Are you sure you want to remove this student?');
    if (confirmation) {
      this.removeStudent(id);
    }
  }

  removeStudent(id: any) {
    console.log('Inside removeStudent', id,this.user);
    this.api.removeStudent(id,this.user).subscribe(
      (result: any) => {
        // Handle the success response
        console.log(result);
        // If the student was successfully removed, remove the student from the allstudents array
        if (result.statusCode === 200) {
          this.allstudents = this.allstudents.filter((student: any) => student.id !== id);
        }
      },
      (error: any) => {
        // Handle the error response
        console.error(error);
        // Show an error message to the user (you can use a toast or any other method for displaying the message)
        // For example, you can use a library like ngx-toastr to show toast messages.
      }
    );
  }
}
