import { Injectable } from '@angular/core';
import { Teacher } from 'src/app/models/teacher';
import { HttpClient } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/project-variables';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  selectedTeacher: Teacher;
  teachers: Teacher[];

  readonly API_URL = new ProjectVariable().serverLocation+'api/teachers';

  constructor(private http: HttpClient) {
    this.selectedTeacher = new Teacher();
  }

  getTeachers() {
    return this.http.get(this.API_URL);
  }

  getTeacher(code) {
    return this.http.get(this.API_URL+"/"+code);
  }

  postTeacher(teacher: Teacher) {
    return this.http.post(this.API_URL, teacher);
  }

  putTeacher(teacher: Teacher) {
    return this.http.put(this.API_URL + `/${teacher._id}`, teacher);
  }

  deleteTeacher(_id: string) {
    return this.http.delete(this.API_URL + `/${_id}`);
  }
}
