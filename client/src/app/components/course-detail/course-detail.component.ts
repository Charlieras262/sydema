import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { ProjectVariable } from 'src/app/variables/project-variables';
import { Course } from 'src/app/models/course';
import { ActivatedRoute } from '@angular/router';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course: Course;
  socket = io(new ProjectVariable().serverLocation);
  therecourse: boolean;
  content: string;

  constructor(public route: ActivatedRoute) {
    this.therecourse = false;
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
      });
    });
    this.getCourseDetail();
  }

  getCourseDetail() {
    var data = localStorage.getItem('selectedCourse');
    this.course = JSON.parse(data) as Course;
    if (data) {
      this.therecourse = true;
    }
  }
  isThisContent(name){
    var url = this.route.snapshot.url.toString();
    this.content = url.split(',')[2];
    if(name.toString() == this.content){
      return true;
    }else{
      return false;
    }
  }
}
