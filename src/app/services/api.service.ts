import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL='http://localhost:5000'

  constructor(private http:HttpClient) { }

  // register api call
  register(name:any,username:any,classN:any,password:any){
    const body={
      name,
      username,
      classN,
      password
    }
    return this.http.post('http://localhost:5000/register',body)
  }

  // login api call
  login(username:any,password:any){
    const body={
      username,
      password,
    }
    return this.http.post('http://localhost:5000/login',body)
  }

   // append token to the request header
   appendToken(){
    // to get the token from the local storage
    let token=localStorage.getItem('token')

    // create http header
    let headers=new HttpHeaders()

    if(token){
      headers=headers.append('verify-token',token)
      options.headers=headers
    }
    return options
  }

  // add student api call
  addStudent(studentName:any,studentId:any,teacherName:any){
    const body={
      studentName,
      studentId,
      teacherName
    }
    return this.http.post('http://localhost:5000/addstudent',body,this.appendToken())
  }

  // get student api call
  getStudents(teacherName:any){
    const body={
      teacherName
    }
    return this.http.get('http://localhost:5000/teacher-dashboard/students',this.appendToken())
  }

  // view student api call
  viewStudents(teacherName:any,id:any){
    return this.http.get(`${this.BASE_URL}/teacher-dashboard/students/${id}`,this.appendToken())
  }

  // student register api
  studentRegister(studentName:any,studentId:any,studentUsername:any,studentPassword:any){
    console.log('Inside student register api', studentName,studentId,studentUsername,studentPassword);
    const body={
      studentName,
      studentId,
      studentUsername,
      studentPassword
    }
    return this.http.post('http://localhost:5000/studentRegister',body)
  }

  // student login api
  studentLogin(studentUsername:any,studentPassword:any){
    const body={
      studentUsername,
      studentPassword
    }
    return this.http.post('http://localhost:5000/studentLogin',body)
  }

  // Add student details api
  addStudentDetails(studentUsername:any,studentDetails:any) {
    const body = {
      studentUsername,
      studentDetails
    };
    console.log('inside front end api',body);
    return this.http.post('http://localhost:5000/studentDetails',body,this.appendToken());
  }

  // get student details
  getDetails(studentUsername: any) {
    const params = {
      studentUsername: studentUsername,
    };
    console.log('front api', studentUsername);
    return this.http.get('http://localhost:5000/studentDashboard/getDetails', { params: params, headers: this.appendToken().headers });
  }

  //add student marks
  addStudentMark(studentName:any,studentMark:any){
    const body={
      studentName,
      studentMark
    }
    return this.http.post('http://localhost:5000/teacherDashboard/addStudentMarks',body,this.appendToken())
  }

  // remove student
  removeStudent(id: any, teacherName: any) {
    console.log('frontend api', id, teacherName);
    const body = {
      id,
      teacherName,
    };
    const options = this.appendToken();
  
    return this.http.delete(`${this.BASE_URL}/teacher-dashboard/students`, { ...options, body });
  }
}
