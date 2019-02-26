import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/course';
import { HttpClient } from '@angular/common/http';
import { ProjectVariable } from 'src/app/variables/project-variables';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  selectedCourse: Course;
  courses: Course[];

  readonly API_URL = new ProjectVariable().serverLocation+'api/courses';

  constructor(private http: HttpClient) { 
    this.selectedCourse = new Course();
  }

  getCourses() {
    return this.http.get(this.API_URL);
  }

  getCourse(id) {
    return this.http.get(this.API_URL + "/" + id);
  }

  postCourse(course: Course) {
    return this.http.post(this.API_URL, course);
  }

  putCourse(course: Course) {
    return this.http.put(this.API_URL + `/${course._id}`, course);
  }

  deleteCourse(_id: string) {
    return this.http.delete(this.API_URL + `/${_id}`);
  }
}
