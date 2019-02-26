import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  
  course: Course;
  therecourse: boolean;

  constructor() { }

  ngOnInit() {
    this.getCourseDetail();
  }

  getCourseDetail() {
    var data = localStorage.getItem('selectedCourse');
    this.course = JSON.parse(data) as Course;
    if (data) {
      this.therecourse = true;
    }
  }
}
