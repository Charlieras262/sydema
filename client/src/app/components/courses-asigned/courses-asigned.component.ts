import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/students/student.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as io from 'socket.io-client';
import { ProjectVariable } from 'src/app/variables/project-variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-asigned',
  templateUrl: './courses-asigned.component.html',
  styleUrls: ['./courses-asigned.component.css']
})
export class CoursesAsignedComponent implements OnInit {

  loading: boolean;
  socket = io(new ProjectVariable().serverLocation);

  constructor(
    public studentService: StudentService,
    public authService: AuthService,
    public router: Router
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.authService.loadUser();
    this.getStudent();
  }

  getStudent() {
    var student = JSON.parse(this.authService.user);
    this.socket.on('getCourse', (data) => {
      if (data) {
        this.studentService.selectedCourse = data;
      }
      this.loading = false;
    });
    this.socket.emit('getCourse', student.id);
  }

  thereCourses() {
    var flag = false;
    if (!this.loading) {
      if (this.studentService.selectedCourse === undefined) {
        flag = false;
      } else {
        if (this.studentService.selectedCourse.course_asigned.length !== 0) {
          flag = true;
        } else {
          flag = false;
        }
      }
    } else {
      flag = true;
    }
    return flag;
  }

  isLoaded() {
    if (this.thereCourses() && !this.loading) {
      return true;
    } else {
      return false;
    }
  }

  showCourseDeatil(course) {
    var data = JSON.stringify(course);
    localStorage.setItem('selectedCourse', data);
  }
}
