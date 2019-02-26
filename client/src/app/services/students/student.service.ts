import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../../models/student';
import { Course } from 'src/app/models/course';
import { ProjectVariable } from 'src/app/variables/project-variables';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  selectedStudent: Student;
  selectedCourse: any;
  students: Student[];

  readonly API_URL = new ProjectVariable().serverLocation+'api/students';

  constructor(private http: HttpClient) {
    this.selectedStudent = new Student();
  }

  getStudent(id) {
    return this.http.get(this.API_URL + "/1/" + id);
  }

  authInformation(user){
    return this.http.get(this.API_URL + "/auth/" + user);
  }

  getStudents() {
    return this.http.get(this.API_URL);
  }

  postStudent(student: Student) {
    return this.http.post(this.API_URL, student);
  }

  putStudent(student: Student) {
    return this.http.put(this.API_URL + `/${student._id}`, student);
  }

  deleteStudent(_id: string) {
    return this.http.delete(this.API_URL + `/${_id}`);
  }
}
