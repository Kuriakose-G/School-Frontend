import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-enter-marks',
  templateUrl: './enter-marks.component.html',
  styleUrls: ['./enter-marks.component.css']
})
export class EnterMarksComponent implements OnInit{

  studentId: string = '';
  teacherName:any='';
  studentName:any='';
  saveSuccess:string='';
  saveError:string='';

  constructor(private activatedRoute:ActivatedRoute, private FB:FormBuilder, private api:ApiService){}

  markForm=this.FB.group({
    semester: ['', Validators.required],
      type: ['', Validators.required],
      number: ['', Validators.required],
      subject: ['', Validators.required],
      mark: ['', [Validators.required, Validators.pattern(/^(?:10|\d(\.\d)?)$/)]]
  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];
      this.getStudentName()
  })
}

getStudentName(){
  this.teacherName=localStorage.getItem('currentUser')
  this.api.viewStudents(this.teacherName,this.studentId).subscribe((result:any)=>{
    this.studentName=result.student.studentName
  })
}

saveMark(){
  if(this.markForm.valid){
    const studentMark={
      semester:this.markForm.value.semester,
      type:this.markForm.value.type,
      number:this.markForm.value.number,
      subject:this.markForm.value.subject,
      mark:this.markForm.value.mark
    }
    console.log(studentMark);
    this.api.addStudentMark(this.studentName,studentMark).subscribe((result:any)=>{
      console.log('marks added');
      this.saveSuccess=result.message
      alert('Marks Added')
      this.markForm.reset()
    },(result:any)=>{
      console.log('Failde to add marks');
      this.saveError=result.error.message
      this.markForm.reset()
    })
  }
}

}
