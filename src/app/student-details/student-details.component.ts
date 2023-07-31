import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {

  saveSuccess:string='';
  saveError:string='';

  constructor(private detailsFB:FormBuilder, private detailsRoute:Router, private api:ApiService){}

  // Validation
  detailsForm=this.detailsFB.group({
    email:['',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
    dob:['',[Validators.required,Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)]],
    gender:[],
    contact:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
    gname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    gcontact:['',[Validators.required,Validators.pattern(/^\d{10}$/)]]
  })

  saveDetails() {
    if (this.detailsForm.valid) {
      const studentUsername = localStorage.getItem('currentStudent'); 
      console.log(studentUsername);    
      const studentDetails = {
        email: this.detailsForm.value.email,
        dob: this.detailsForm.value.dob,
        gender: this.detailsForm.value.gender,
        contact: this.detailsForm.value.contact,
        gname: this.detailsForm.value.gname,
        gcontact: this.detailsForm.value.gcontact
      };
  console.log(studentDetails);
      this.api.addStudentDetails(studentUsername,studentDetails).subscribe(
        (result:any) => {
          console.log('Student details added successfully');
          this.saveSuccess=result.message
          alert('Details successfully added')
          // Handle success response
          this.detailsRoute.navigateByUrl('/studentDashboard')
        },
        (result:any) => {
          console.log('Failed to add student details');
          this.saveError=result.error.message
          // Handle error response
        }
      );
    }
  }

}
