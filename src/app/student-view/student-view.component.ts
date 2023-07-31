import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit{

  students:any=[]
  student: any = null;
  teacherName:any=''
  studentId: string = '';
  studentUsername: string = '';
  studentDetails: any = {};
  studentMarks:any=[];
  mathsSem1: any[] = [];
  mathsSem2: any[] = [];
  scienceSem1: any[] = [];
  scienceSem2: any[] = [];
  englishSem1: any[] = [];
  englishSem2: any[] = [];
  errorMessage:string='Student has not registered yet';
  hasError: boolean = false;

  constructor(private api:ApiService, private activatedRoute:ActivatedRoute, private FB:FormBuilder){}

   ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.studentId = params['id'];
      this.fetchStudentDetails();
    }); 
  }



  fetchStudentDetails() {
    this.teacherName = localStorage.getItem('currentUser');
    try {
      this.api.viewStudents(this.teacherName, this.studentId).subscribe((result: any) => {
        this.student = result.student;
        console.log(this.student);
        this.studentUsername = this.student.studentName;
        console.log(this.studentUsername);

        this.api.getDetails(this.studentUsername).subscribe(
          (result: any) => {
            this.studentDetails = result.details; // Store the student details
            this.studentMarks = result.details.marks;
            console.log(this.studentDetails);
            console.log(this.studentMarks);
            this.arrangeMarks();
          },
          (error: any) => {
            console.log('error', error);
            this.hasError = true;
          }
        );
      });
    } catch (error) {
      console.log(error);
      this.hasError = true;
    }
  }

      arrangeMarks() {
        // Reset the arrays
        this.mathsSem1 = [];
        this.mathsSem2 = [];
        this.scienceSem1 = [];
        this.scienceSem2 = [];
        this.englishSem1 = [];
        this.englishSem2 = [];
      
        // Loop through the student marks and arrange them into the respective arrays
        this.studentMarks.forEach((mark: any) => {
          if (mark.subject === 'maths') {
            if (mark.semester === '1') {
              if (mark.type === 'internal') {
                if (!this.mathsSem1[0]) this.mathsSem1[0] = { internal1: mark.mark };
                else this.mathsSem1[0].internal2 = mark.mark;
              } else if (mark.type === 'assignment') {
                if (!this.mathsSem1[1]) this.mathsSem1[1] = { assignment1: mark.mark };
                else this.mathsSem1[1].assignment2 = mark.mark;
              }
            } else if (mark.semester === '2') {
              if (mark.type === 'internal') {
                if (!this.mathsSem2[0]) this.mathsSem2[0] = { internal1: mark.mark };
                else this.mathsSem2[0].internal2 = mark.mark;
              } else if (mark.type === 'assignment') {
                if (!this.mathsSem2[1]) this.mathsSem2[1] = { assignment1: mark.mark };
                else this.mathsSem2[1].assignment2 = mark.mark;
              }
            }
          } else if (mark.subject === 'science') {
            if (mark.semester === '1') {
              if (mark.type === 'internal') {
                if (!this.scienceSem1[0]) this.scienceSem1[0] = { internal1: mark.mark };
                else this.scienceSem1[0].internal2 = mark.mark;
              } else if (mark.type === 'assignment') {
                if (!this.scienceSem1[1]) this.scienceSem1[1] = { assignment1: mark.mark };
                else this.scienceSem1[1].assignment2 = mark.mark;
              }
            } else if (mark.semester === '2') {
              if (mark.type === 'internal') {
                if (!this.scienceSem2[0]) this.scienceSem2[0] = { internal1: mark.mark };
                else this.scienceSem2[0].internal2 = mark.mark;
              } else if (mark.type === 'assignment') {
                if (!this.scienceSem2[1]) this.scienceSem2[1] = { assignment1: mark.mark };
                else this.scienceSem2[1].assignment2 = mark.mark;
              }
            }
          } else if (mark.subject === 'english') {
            if (mark.semester === '1') {
              if (mark.type === 'internal') {
                if (!this.englishSem1[0]) this.englishSem1[0] = { internal1: mark.mark };
                else this.englishSem1[0].internal2 = mark.mark;
              } else if (mark.type === 'assignment') {
                if (!this.englishSem1[1]) this.englishSem1[1] = { assignment1: mark.mark };
                else this.englishSem1[1].assignment2 = mark.mark;
              }
            } else if (mark.semester === '2') {
              if (mark.type === 'internal') {
                if (!this.englishSem2[0]) this.englishSem2[0] = { internal1: mark.mark };
                else this.englishSem2[0].internal2 = mark.mark;
              } else if (mark.type === 'assignment') {
                if (!this.englishSem2[1]) this.englishSem2[1] = { assignment1: mark.mark };
                else this.englishSem2[1].assignment2 = mark.mark;
              }
            }
          }
        });
      
        console.log('Final marks:', this.mathsSem1, this.mathsSem2, this.englishSem1, this.englishSem2, this.scienceSem1, this.scienceSem2);
      }
      
}


