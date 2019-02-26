import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TeacherService } from 'src/app/services/teachers/teacher.service';
import { Teacher } from 'src/app/models/teacher';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
  providers: [TeacherService]
})
export class TeachersComponent implements OnInit {

  constructor(
    public teacherService: TeacherService
  ) { }

  ngOnInit() {
    this.animImage();
    this.getTeachers();
  }

  addTeacher(form: NgForm) {
    if(form.value._id){
      this.teacherService.putTeacher(form.value)
        .subscribe(res => {
          this.cleanForm(form);
          $.toaster('Teacer Updated Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
          this.getTeachers();
        });
    }else{
      this.teacherService.postTeacher(form.value)
      .subscribe(res => {
        this.cleanForm(form);
        $.toaster('Teacher Saved Successfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
        this.getTeachers();
      });
    }
  }

  getTeachers() {
    this.teacherService.getTeachers().
      subscribe(res => {
        this.teacherService.teachers = res as Teacher[];
      });
  }

  editStudent(teacher: Teacher) {
    this.teacherService.selectedTeacher = teacher;
  }

  deleteStudent(_id: string){
    this.teacherService.deleteTeacher(_id)
    .subscribe(res => {
      $.toaster('Teacher Deleted Succesfully <i class="fa fa-check-circle"></i>', 'Notice', 'success');
      this.getTeachers();
    });
  }

  cleanForm(form?: NgForm) {
    if (form) {
      form.reset();     
      this.teacherService.selectedTeacher = new Teacher();
    }
  }

  animImage() {
    $('.js-tilt').tilt({
      scale: 1.1
    })
  }
}
