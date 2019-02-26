import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/courses/course.service';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/models/course';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CoursesComponent]
})
export class CoursesComponent implements OnInit {

  constructor(public courseService: CourseService) { }

  ngOnInit() {
    this.animImage();
    this.getCourses();
  }

  addCourse(form: NgForm) {
    if (form.value._id) {
      this.courseService.putCourse(form.value)
        .subscribe(res => {
          this.cleanForm(form);
          $.toaster('Course Updated Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
          this.getCourses();
        });
    } else {
      this.courseService.postCourse(form.value)
        .subscribe(res => {
          this.cleanForm(form);
          $.toaster('Course Saved Successfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
          this.getCourses();
        });
    }
  }

  getCourses() {
    this.courseService.getCourses().
      subscribe(res => {
        this.courseService.courses = res as Course[];
      });
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.courseService.selectedCourse = new Course();
    }
  }

  editCourse(course: Course) {
    this.courseService.selectedCourse = course;
  }

  deleteCourse(_id: string) {
    this.courseService.deleteCourse(_id)
      .subscribe(res => {
        $.toaster('Course Deleted Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
        this.getCourses();
      });
  }

  animImage() {
    $('.js-tilt').tilt({
      scale: 1.1
    })
  }
}
